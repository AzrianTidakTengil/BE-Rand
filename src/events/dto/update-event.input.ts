import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}
