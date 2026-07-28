import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateLogScheduleInput {
  @Field(() => Int, { nullable: true })
  taskDayId?: number;

  @Field(() => Int, { nullable: true })
  eventId?: number;
}
