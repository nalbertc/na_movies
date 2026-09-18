import "dotenv/config";
import * as nodemailer from "nodemailer";

export let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verifica se o transporte está configurado corretamente
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Erro ao configurar o transporte de e-mail:", error);
//   } else {
//     console.log("Transporte de e-mail configurado com sucesso:", success);
//   }
// });
