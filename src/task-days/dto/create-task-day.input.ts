import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskDayInput {
  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;

  @Field(() => Int)
  taskId!: number;
}
