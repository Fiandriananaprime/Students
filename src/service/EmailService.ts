import nodemailer from "nodemailer";

export class EmailService {
    private readonly transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendVerificationCode(
        email: string,
        code: string
    ): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email verification",
            text: `Your verification code is: ${code}. This code expires in 10 minutes.`
        });
    }
}