import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transporter = nodemailer.createTransport({
    service: 'Office365',
    auth: {
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('SMTP_CLIENT_ID'),
      clientSecret: this.configService.get('SMTP_CLIENT_SECRET'),
    },
  });
  async notifyEmail({ email }: NotifyEmailDto) {
    console.log('Sending email to', email);
    try {
      await this.transporter.sendMail({
        from: this.configService.get('SMTP_USER'),
        to: email,
        subject: 'Reservation Confirmation',
        text: 'Test Text',
      });
    } catch (error) {
      console.log('Error sending email', error);
    }
  }
}
