import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
@Injectable()
export class NotificationsService {
  constructor() {}
  private readonly transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: 'info@qpmatrix.tech',
      pass: 'AkZNqsU83zpmw7Vh',
    },
  });
  async notifyEmail({ email, text }: NotifyEmailDto) {
    try {
      await this.transporter.sendMail({
        from: 'info@qpmatrix.tech',
        to: email,
        subject: 'Reservation Confirmation',
        text: text,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
