import { ObjectType, Field } from '@nestjs/graphql';
import { Daily } from '../daily/entities/daily.entity';
import { Weekly } from '../weekly/entities/weekly.entity';
import { TaskDay } from '../task-days/entities/task-days.entity';

@ObjectType()
export class ScheduleResponse {
  @Field(() => [Daily])
  daily!: Daily[];

  @Field(() => [Weekly])
  weekly!: Weekly[];

  @Field(() => [TaskDay])
  schedule!: TaskDay[];
}
