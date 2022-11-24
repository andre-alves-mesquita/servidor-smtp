const mailer = require("nodemailer");
require("dotenv").config();

module.exports = (email, nome, mensagem, titulo, deployment) => {
  const smtpTransport = mailer.createTransport({
    host: process.env.HOST_SMTP,
    port: process.env.PORT_SMTP,
    secure: false, //SSL/TLS
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_SENHA,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mail = {
    from: process.env.EMAIL_LOGIN,
    to: email,
    subject: `${nome} - ${titulo} - ${deployment}`,
    text: mensagem,
    html: `<h3>${titulo}</h3><p>${mensagem}</p>`,
  };

  return new Promise((resolve, reject) => {
    smtpTransport
      .sendMail(mail)
      .then((response) => {
        smtpTransport.close();
        return resolve(response);
      })
      .catch((error) => {
        smtpTransport.close();
        return reject(error);
      });
  });
};
