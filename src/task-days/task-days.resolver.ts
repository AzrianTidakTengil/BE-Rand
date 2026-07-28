import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { TaskDaysService } from './task-days.service';
import { TaskDay } from './entities/task-days.entity';
import { CreateTaskDayInput } from './dto/create-task-day.input';
import { UpdateTaskDayInput } from './dto/update-task-day.input';
import { AppService } from '../app.service';

@Resolver()
export class TaskDaysResolver {
  constructor(
    private readonly taskDaysService: TaskDaysService,
    private readonly appService: AppService,
  ) {}

  @Query(() => [TaskDay], { name: 'getAllTaskDays' })
  async getAllTaskDays() {
    try {
      const response = await this.taskDaysService.findAll();
      if (response.length == 0) {
        await this.appService.generateRandomDailySchedule();
        return await this.taskDaysService.findAll();
      }
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Query(() => TaskDay, { name: 'getTaskDayById', nullable: true })
  async findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.taskDaysService.findUnique(id);
  }
  @Mutation(() => Int, { name: 'createManyTaskDays' })
  async createMany(
    @Args({ name: 'data', type: () => [CreateTaskDayInput] })
    data: CreateTaskDayInput[],
  ) {
    const result = await this.taskDaysService.createMany(data);
    return result.count;
  }

  @Mutation(() => TaskDay, { name: 'updateTaskDay' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateTaskDayInput,
  ) {
    return this.taskDaysService.update(id, data);
  }

  @Mutation(() => TaskDay, { name: 'deleteTaskDay' })
  async delete(@Args('id', { type: () => Int }) id: number) {
    return this.taskDaysService.delete(id);
  }
}
