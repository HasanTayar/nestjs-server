import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RoleDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
