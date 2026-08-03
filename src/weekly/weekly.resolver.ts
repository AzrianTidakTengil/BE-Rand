import { Mutation, Resolver, Query, Args, Int } from '@nestjs/graphql';
import { WeeklyService } from './weekly.service';
import { CreateWeeklyInput } from './dto/create-weekly.input';
import { UpdateWeeklyInput } from './dto/update-weekly.input';
import { Weekly } from './entities/weekly.entity';

@Resolver(() => Weekly)
export class WeeklyResolver {
  constructor(private readonly weeklyService: WeeklyService) {}

  @Mutation(() => Weekly, { name: 'createManyWeekly' })
  async createMany(
    @Args({ name: 'data', type: () => [CreateWeeklyInput] })
    data: CreateWeeklyInput[],
  ) {
    const result = await this.weeklyService.createMany(data);
    return result.count;
  }

  @Query(() => [Weekly], { name: 'getAllWeekly' })
  async getAllWeekly() {
    return this.weeklyService.findAll();
  }

  @Query(() => Weekly, { name: 'getWeeklyById', nullable: true })
  async findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.weeklyService.findUnique(id);
  }

  @Mutation(() => Weekly, { name: 'updateWeekly' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateWeeklyInput,
  ) {
    return this.weeklyService.update(id, data);
  }

  @Mutation(() => Weekly, { name: 'deleteWeekly' })
  async delete(@Args('id', { type: () => Int }) id: number) {
    return this.weeklyService.delete(id);
  }
}
