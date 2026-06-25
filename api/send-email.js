import { resend } from 'resend';
require('dotenv').config();

const miCorreo = `sotovan.altarite@outlook.com`;
//api key
const resend = new Resend(process.env.RESEND_API_KEY);
export default handler = async (req, res) => {
    //si no viene por POST no hacemos nada
    if (req.method !== 'POST') {
        return res.status(405).end()
    };
    try {

        const { nombre, empresa, email, tel, cargo, servicio, mensaje } = req.body;

        // Estructura HTML limpia y profesional con estilos en línea para el cliente de correo
        const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
    <h2 style="color: #1a1a1a; border-bottom: 2px solid #0070f3; padding-bottom: 10px; margin-top: 0;">
      📥 Nuevo Prospecto - altarite.com
    </h2>
    
    <p style="font-size: 16px;">Hola Vania, has recibido un nuevo mensaje a través del formulario de contacto. Aquí tienes los detalles:</p>
    
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
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <a href="mailto:${email}" style="color: #0070f3; text-decoration: none;">${email}</a>
        </td>
      </tr>
      <tr style="background-color: #f9f9f9;">
        <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Teléfono:</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <a href="tel:${tel}" style="color: #0070f3; text-decoration: none;">${tel || 'No proporcionado'}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Servicio de interés:</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e3f2fd; color: #0d47a1; padding: 4px 8px; border-radius: 4px; font-size: 14px; font-weight: bold;">${servicio}</span></td>
      </tr>
    </table>
    
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; border-left: 4px solid #0070f3; margin-top: 20px;">
      <strong style="display: block; margin-bottom: 8px; color: #555;">Mensaje:</strong>
      <p style="margin: 0; white-space: pre-wrap; color: #222;">${mensaje}</p>
    </div>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0 20px 0;" />
    <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
      Este es un correo automático generado por el sistema de altarite.com
    </p>
  </div>
`;

        await resend.emails.send({
            from: 'Altarite Form <onboarding@resend.dev>',
            to: miCorreo, // Asegúrate de que apunte al correo de Vania verificado en Resend
            subject: `💼 Nuevo contacto: ${nombre} (${empresa || 'Particular'}) - altarite.com`,
            html: html,
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });

    }
}