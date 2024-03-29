import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Stripe } from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { text } from 'stream/consumers';
@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}
  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      payment_method: 'pm_card_visa',
      currency: 'usd',
    });
    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} was successful`,
    });
    return paymentIntent;
  }
}
