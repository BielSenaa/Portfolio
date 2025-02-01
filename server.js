const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true}));

//Rota para receber dados do formulário
app.post('/enviar', (req, res) => {
    const {name, email, message } = req.body;

    //Configuração do Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', //Use o serviço de e-mail que preferir
        auth: {
            user: 'zikabiel90@icloud.com', //Seu email
            pass: 'Landobiel12', //Sua senha
        },
    });

    const mailOptions = {
        from: 'zikabiel90@icloud.com',
        to: 'destinatario@email.com', //E-mail do destinatário
        subject: `Nova mensagem de ${name}`,
        text: `Nome ${nome}\nE-email: ${email}\nMensagem: ${message}`,
    };

    //Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Erro ao enviar a mensagem.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.send('Mensagem enviada com sucesso!');
        }
    });
});

//Iniciar o servidor
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});