import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateWeeklyInput {
  @Field()
  name!: string;

  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;

  @Field(() => Int)
  day!: number;
}
