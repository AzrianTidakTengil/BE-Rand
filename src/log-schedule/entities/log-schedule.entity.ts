import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LogSchedule {
  @Field(() => Int)
  taskId?: number;

  @Field(() => Int)
  eventId?: number;
}
