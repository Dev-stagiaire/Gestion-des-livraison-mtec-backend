import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) {};

    async sendMail(createMailDto: CreateMailDto): Promise<SentMessageInfo>{
        try {
            if (typeof createMailDto.context === "string") {
                createMailDto.context = JSON.parse(createMailDto.context);
            }
            return await this.mailerService.sendMail({
                to: createMailDto.sendTo,
                subject: createMailDto.subject,
                template: createMailDto.template,
                context: { context: createMailDto.context }
            })
            
        } catch (error) {
            throw error;
        }
    }

}
