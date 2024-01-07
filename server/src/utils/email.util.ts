import { createTransport } from 'nodemailer';
import { convert } from 'html-to-text';

interface IEmail
{
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
}

export class EmailUtil
{
    private readonly to: string;
    private readonly url: string;
    private readonly from: string;

    constructor(to: string, url?: string)
    {
        this.to = to;
        this.url = url;
        this.from = process.env.MAIL_FROM;
    }

    private static newTransport(mailOptions: IEmail)
    {
        return createTransport
        (
            {
                service: process.env.MAIL_SERVICE,
                host: process.env.MAIL_HOST,
                port: +process.env.MAIL_PORT,
                auth:
                {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            }
        ).sendMail(mailOptions);
    }

    private async send(template: string, subject: string): Promise<void>
    {
        const mailOptions: IEmail =
        {
            from: this.from,
            to: this.to,
            subject,
            html: template,
            text: convert(template)
        };

        await EmailUtil.newTransport(mailOptions);
    }
}
