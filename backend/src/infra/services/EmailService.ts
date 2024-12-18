import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '6c4e88f0c46663',
      pass: '8f5c13493a9d31',
    },
  });

  await transporter.sendMail({
    from: '"Admin" <droncaglio@gmail.com>',
    to,
    subject,
    text,
  });
};
