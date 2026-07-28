import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  name!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}
