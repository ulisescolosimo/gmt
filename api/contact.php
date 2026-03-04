<?php
/**
 * Formulario de contacto - Envío por SMTP para cPanel.
 * Configuración SMTP al inicio del archivo (sin .env).
 */
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ——————— Configuración SMTP (editar aquí en el servidor) ———————
$smtp = [
    'host'     => 'grupopmkt.com',
    'port'     => 465,
    'user'     => 'info@grupopmkt.com',
    'pass'     => 'rsKcgUzdns~T',
    'to_email' => 'colosimo101@gmail.com',
];
// ——————————————————————————————————————————————————————————————————

function jsonError($message, $code = 500) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function readSmptResponse($fp) {
    do {
        $line = @fgets($fp, 515);
        if ($line === false) return false;
        $line = trim($line);
    } while ($line !== '' && !preg_match('/^\d{3}\s/', $line));
    return $line;
}

function escapeHtml($s) {
    if ($s === null || $s === '') return '';
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

try {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];

    $nombre      = trim((string) ($data['nombre'] ?? ''));
    $apellido    = trim((string) ($data['apellido'] ?? ''));
    $empresa     = trim((string) ($data['empresa'] ?? ''));
    $telefono    = trim((string) ($data['telefono'] ?? ''));
    $email       = trim((string) ($data['email'] ?? ''));
    $comentarios = trim((string) ($data['comentarios'] ?? ''));

    if ($nombre === '' || $apellido === '' || $empresa === '' || $email === '' || $comentarios === '') {
        jsonError('Faltan campos requeridos: nombre, apellido, empresa, email, comentarios', 400);
    }

    $from    = $smtp['user'];
    $to      = $smtp['to_email'];
    $subject = '[Grupo PMKT] Contacto: ' . $nombre . ' ' . $apellido . ' - ' . $empresa;
    $replyTo = $email;

    $text = "Nombre: $nombre $apellido\n"
        . "Empresa: $empresa\n"
        . "Email: $email\n"
        . "Teléfono: " . ($telefono !== '' ? $telefono : '—') . "\n\n"
        . "Comentarios:\n$comentarios";

    $html = '<p><strong>Nombre:</strong> ' . escapeHtml($nombre) . ' ' . escapeHtml($apellido) . '</p>'
        . '<p><strong>Empresa:</strong> ' . escapeHtml($empresa) . '</p>'
        . '<p><strong>Email:</strong> <a href="mailto:' . escapeHtml($email) . '">' . escapeHtml($email) . '</a></p>'
        . '<p><strong>Teléfono:</strong> ' . ($telefono !== '' ? escapeHtml($telefono) : '—') . '</p>'
        . '<p><strong>Comentarios:</strong></p><p>' . nl2br(escapeHtml($comentarios)) . '</p>';

    $boundary = '----=_Part_' . md5(uniqid());
    $body = "--$boundary\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n\r\n"
        . $text . "\r\n"
        . "--$boundary\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n\r\n"
        . $html . "\r\n"
        . "--$boundary--";

    $message = "From: \"Grupo PMKT Contacto\" <{$from}>\r\n"
        . "To: $to\r\n"
        . "Reply-To: $replyTo\r\n"
        . "Subject: $subject\r\n"
        . "MIME-Version: 1.0\r\n"
        . "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n\r\n"
        . $body;

    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer'      => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ]
    ]);

    $fp = @stream_socket_client(
        'ssl://' . $smtp['host'] . ':' . $smtp['port'],
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT,
        $ctx
    );

    if (!$fp) {
        jsonError('No se pudo conectar al servidor de correo. Compruebe en cPanel que el hosting permite conexiones salientes por el puerto 465.');
    }

    $read = readSmptResponse($fp);
    if ($read === false || substr($read, 0, 1) !== '2') {
        @fclose($fp);
        jsonError('Error al conectar con el servidor SMTP.');
    }

    $send = function ($cmd) use ($fp) {
        fwrite($fp, $cmd . "\r\n");
    };

    $send('EHLO ' . ($smtp['host'] ?? 'localhost'));
    readSmptResponse($fp);

    $send('AUTH LOGIN');
    readSmptResponse($fp);
    $send(base64_encode($smtp['user']));
    readSmptResponse($fp);
    $send(base64_encode($smtp['pass']));
    $auth = readSmptResponse($fp);

    if ($auth === false || strpos($auth, '235') !== 0) {
        @fclose($fp);
        jsonError('Error de autenticación con el servidor de correo. Verifique usuario y contraseña SMTP en api/contact.php.');
    }

    $send('MAIL FROM:<' . $from . '>');
    if (readSmptResponse($fp) === false) {
        @fclose($fp);
        jsonError('Error al enviar el mensaje.');
    }
    $send('RCPT TO:<' . $to . '>');
    if (readSmptResponse($fp) === false) {
        @fclose($fp);
        jsonError('Error al enviar el mensaje.');
    }
    $send('DATA');
    readSmptResponse($fp);
    fwrite($fp, $message . "\r\n.\r\n");
    $dataResp = readSmptResponse($fp);
    if ($dataResp === false || substr($dataResp, 0, 1) !== '2') {
        @fclose($fp);
        jsonError('Error al enviar el mensaje.');
    }
    $send('QUIT');
    @fclose($fp);

    http_response_code(200);
    echo json_encode(['ok' => true]);

} catch (Throwable $e) {
    if (function_exists('error_log')) {
        @error_log('contact.php: ' . $e->getMessage());
    }
    jsonError('Error al enviar el mensaje.');
}
