<?php
/**
 * Formulario de contacto - Envío por SMTP para cPanel.
 * Configuración SMTP al inicio del archivo (sin .env).
 */
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

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];

$nombre     = trim((string) ($data['nombre'] ?? ''));
$apellido   = trim((string) ($data['apellido'] ?? ''));
$empresa    = trim((string) ($data['empresa'] ?? ''));
$telefono   = trim((string) ($data['telefono'] ?? ''));
$email      = trim((string) ($data['email'] ?? ''));
$comentarios = trim((string) ($data['comentarios'] ?? ''));

if ($nombre === '' || $apellido === '' || $empresa === '' || $email === '' || $comentarios === '') {
    http_response_code(400);
    echo json_encode([
        'ok'    => false,
        'error' => 'Faltan campos requeridos: nombre, apellido, empresa, email, comentarios'
    ]);
    exit;
}

function escapeHtml($s) {
    if ($s === null || $s === '') return '';
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

$from     = $smtp['user'];
$to       = $smtp['to_email'];
$subject  = '[Grupo PMKT] Contacto: ' . $nombre . ' ' . $apellido . ' - ' . $empresa;
$replyTo  = $email;

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

$errno = 0;
$errstr = '';
$ctx = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]);
$fp = @stream_socket_client(
    'ssl://' . $smtp['host'] . ':' . $smtp['port'],
    $errno,
    $errstr,
    30,
    STREAM_CLIENT_CONNECT,
    $ctx
);

if (!$fp) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Error al enviar el mensaje']);
    exit;
}

$read = function () use ($fp) {
    $line = @fgets($fp, 515);
    return $line !== false ? $line : '';
};

$send = function ($cmd) use ($fp) {
    fwrite($fp, $cmd . "\r\n");
};

// 220
$read();
$send('EHLO ' . ($smtp['host'] ?? 'localhost'));
while ($line = $read()) {
    if (preg_match('/^\d{3}\s/', $line) && substr(trim($line), 3, 1) === ' ') break;
}
$send('AUTH LOGIN');
$read();
$send(base64_encode($smtp['user']));
$read();
$send(base64_encode($smtp['pass']));
$auth = $read();
if (strpos($auth, '235') !== 0) {
    fclose($fp);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Error al enviar el mensaje']);
    exit;
}
$send('MAIL FROM:<' . $from . '>');
$read();
$send('RCPT TO:<' . $to . '>');
$read();
$send('DATA');
$read();
fwrite($fp, $message . "\r\n.\r\n");
$read();
$send('QUIT');
fclose($fp);

http_response_code(200);
echo json_encode(['ok' => true]);
