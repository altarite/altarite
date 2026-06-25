import { Resend } from 'resend';

// Inicializamos Resend con mayúscula. Vercel lee process.env en automático.
const resend = new Resend(process.env.RESEND_API_KEY);
const miCorreo = 'sotovan.altarite@outlook.com';

export default async function handler(req, res) {
    // Si no viene por POST no hacemos nada
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { nombre, empresa, email, tel, cargo, servicio, mensaje } = req.body;

        // Validación mínima para evitar enviar campos vacíos a Resend
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: 'Faltan campos obligatorios (nombre, email, mensaje)' });
        }

        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #0070f3; padding-bottom: 10px; margin-top: 0;">
              📥 Nuevo Prospecto - altarite.com
            </h2>
            <p style="font-size: 16px;">Hola Vania, has recibido un nuevo mensaje a través del formulario de contacto:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; width: 30%; border-bottom: 1px solid #eee;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Empresa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${empresa || 'No especificada'}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Cargo:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${cargo || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Teléfono:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${tel}">${tel || 'No proporcionado'}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Servicio:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${servicio || 'No especificado'}</td>
              </tr>
            </table>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; border-left: 4px solid #0070f3;">
              <strong>Mensaje:</strong>
              <p style="margin: 0; white-space: pre-wrap;">${mensaje}</p>
            </div>
          </div>
        `;

        // El 'from' debe usar el string por defecto estricto de Resend en modo gratuito
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: miCorreo, 
            subject: `💼 Nuevo contacto: ${nombre} - altarite.com`,
            html: html,
        });

        return res.status(200).json({ success: true, data });

    } catch (error) {
        console.error("Error interno en la función Serverless:", error);
        return res.status(500).json({ error: error.message });
    }
}