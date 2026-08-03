import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDailyInput {
  @Field()
  name!: string;

  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;
}
