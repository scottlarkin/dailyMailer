import {IEmailer} from './IEmail';
import {inject, injectable} from 'inversify';
import IConfig from '../../config/IConfig';
import {TYPES} from '../types';
const nodemailer = require('nodemailer');

type Transporter = {
    sendMail: (arg: {
        to: string;
        from: string;
        subject: string;
        text: string;
    }) => Promise<void>
};

@injectable()
export class Emailer implements IEmailer {

    private readonly transporter: Transporter;

    constructor(
        @inject(TYPES.CONFIG) private readonly config: IConfig['email']
    ) {
        this.transporter = nodemailer.createTransport(this.config);
    }

    async sendEmail(to: string, title: string, body: string): Promise<void> {
        await this.transporter.sendMail({
            from: `${this.config.sender.name}" <${this.config.sender.email}>`,
            to,
            subject: title,
            text: body,
        });
    }
}
