const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ ok: false, error: 'Method not allowed' });
        return;
    }

    const { nombre, apellido, empresa, telefono, email, comentarios } = req.body || {};

    if (!nombre || !apellido || !empresa || !email || !comentarios) {
        res.status(400).json({
            ok: false,
            error: 'Faltan campos requeridos: nombre, apellido, empresa, email, comentarios'
        });
        return;
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || 'colosimo101@gmail.com';

    if (!host || !user || !pass) {
        console.error('Missing SMTP env: SMTP_HOST, SMTP_USER, SMTP_PASS');
        res.status(500).json({ ok: false, error: 'Configuración de correo no disponible' });
        return;
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
    });

    const mailOptions = {
        from: `"Grupo PMKT Contacto" <${user}>`,
        to: toEmail,
        replyTo: email,
        subject: `[Grupo PMKT] Contacto: ${nombre} ${apellido} - ${empresa}`,
        text: [
            `Nombre: ${nombre} ${apellido}`,
            `Empresa: ${empresa}`,
            `Email: ${email}`,
            `Teléfono: ${telefono || '—'}`,
            '',
            'Comentarios:',
            comentarios
        ].join('\n'),
        html: [
            '<p><strong>Nombre:</strong> ' + escapeHtml(nombre) + ' ' + escapeHtml(apellido) + '</p>',
            '<p><strong>Empresa:</strong> ' + escapeHtml(empresa) + '</p>',
            '<p><strong>Email:</strong> <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></p>',
            '<p><strong>Teléfono:</strong> ' + (telefono ? escapeHtml(telefono) : '—') + '</p>',
            '<p><strong>Comentarios:</strong></p>',
            '<p>' + escapeHtml(comentarios).replace(/\n/g, '<br>') + '</p>'
        ].join('')
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ ok: true });
    } catch (err) {
        console.error('SMTP error:', err.message);
        res.status(500).json({ ok: false, error: 'Error al enviar el mensaje' });
    }
};

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
