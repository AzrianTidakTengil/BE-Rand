import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskDayInput {
  @Field({ nullable: true })
  startTime?: Date;

  @Field({ nullable: true })
  endTime?: Date;

  @Field(() => Int, { nullable: true })
  taskId?: number;
}
