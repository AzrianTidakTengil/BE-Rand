import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateWeeklyInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  startTime?: Date;

  @Field({ nullable: true })
  endTime?: Date;

  @Field(() => Int, { nullable: true })
  day?: number;
}
