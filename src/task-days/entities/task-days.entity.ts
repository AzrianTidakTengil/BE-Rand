import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class TaskDay {
  @Field(() => Int)
  id!: number;

  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;

  @Field(() => Int)
  taskId!: number;

  @Field(() => Task)
  task!: Task;
}
