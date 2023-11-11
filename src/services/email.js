import nodemailer from "nodemailer";

export async function sendEmail(to,subject,html) {
const transporter = nodemailer.createTransport({
service:'gmail',
  auth: {
    user: "hiba.shraim.25@gmail.com",
    pass: "ycyq fmga alkz tnss",
  },
});

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <hiba.shraim.25@gmail.com>', // sender address
    to,
    subject, 
    html, 
  });
return info;
}