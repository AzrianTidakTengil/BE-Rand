import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { LogScheduleService } from './log-schedule.service';
import { LogSchedule } from './entities/log-schedule.entity';
import { CreateLogScheduleInput } from './dto/create-log-schedule.input';

@Resolver()
export class LogScheduleResolver {
  constructor(private readonly logScheduleService: LogScheduleService) {}

  @Query(() => [LogSchedule], { name: 'getAllLogSchedules' })
  async getAllLogSchedules() {
    return this.logScheduleService.findAll();
  }

  @Query(() => LogSchedule, { name: 'getLogScheduleById', nullable: true })
  async findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.logScheduleService.findUnique(id);
  }
  @Mutation(() => Int, { name: 'createManyLogSchedules' })
  async createMany(
    @Args({ name: 'data', type: () => [CreateLogScheduleInput] })
    data: CreateLogScheduleInput[],
  ) {
    const result = await this.logScheduleService.createMany(data);
    return result.count;
  }

  @Mutation(() => LogSchedule, { name: 'deleteLogSchedule' })
  async delete(@Args('id', { type: () => Int }) id: number) {
    return this.logScheduleService.delete(id);
  }
}
