import { Query, Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { PaymentIntent } from './payment-intient';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Query(() => [PaymentIntent], { name: 'payments' })
  findAll() {
    return this.paymentsService.getPayments();
  }
}