import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("SMTP_HOST"),
                    port: config.get<number>("SMTP_PORT"),
                    secure: config.get<string>("SMTP_SECURE") === "true",
                    auth: {
                        user: config.get<string>("SMTP_USER"),
                        pass: config.get<string>("SMTP_PASS"),
                    },
                },
                defaults: {
                    from: config.get<string>("SMTP_FROM"),
                },
            }),
        }),
    ],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
