import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentIntent {
  @Field()
  id: number;
  @Field()
  amount: number;
}
