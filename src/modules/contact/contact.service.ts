import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ContactDto } from "./contact.dto";

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name);

    constructor(private readonly mailer: MailerService) {}

    async send(dto: ContactDto): Promise<void> {
        const { name, company, email, message } = dto;

        const subject = company
            ? `Portfolio Contact: ${name} from ${company}`
            : `Portfolio Contact: ${name}`;

        await this.mailer.sendMail({
            to: process.env.SMTP_TO_EMAIL,
            replyTo: email,
            subject,
            html: `
                <h2>New message from your portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                <p><strong>Email:</strong> ${email}</p>
                <hr />
                <p>${message.replace(/\n/g, "<br />")}</p>
            `,
        });

        this.logger.log(`Contact email received from ${name} (${email})`);
    }
}
