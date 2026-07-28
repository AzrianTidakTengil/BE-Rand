import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task], { name: 'getAllTasks' })
  async getAllTasks() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'getTaskById', nullable: true })
  async findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findUnique(id);
  }
  @Mutation(() => Int, { name: 'createManyTasks' })
  async createMany(
    @Args({ name: 'data', type: () => [CreateTaskInput] })
    data: CreateTaskInput[],
  ) {
    const result = await this.tasksService.createMany(data);
    return result.count;
  }

  @Mutation(() => Task, { name: 'updateTask' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateTaskInput,
  ) {
    return this.tasksService.update(id, data);
  }

  @Mutation(() => Task, { name: 'deleteTask' })
  async delete(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.delete(id);
  }
}
