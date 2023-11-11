const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreplydcuctravel@gmail.com',
    pass: 'Movil12348765.'
  }
});

app.post('/enviar-correo', (req, res) => {
  const { destinatarios, asunto, contenido } = req.body;

  const mailOptions = {
    from: 'noreplydctravel@gmail.com',
    to: destinatarios.join(', '), 
    subject: asunto,
    text: contenido
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
