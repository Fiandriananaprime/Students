import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

export class EmailService {
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendVerificationCode(
    email: string,
    code: string
  ): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email verification",
      text: `Your verification code is: ${code}. This code expires in 10 minutes.`,
    });
  }
}