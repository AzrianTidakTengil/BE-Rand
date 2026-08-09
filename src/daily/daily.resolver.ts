import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { DailyService } from './daily.service';
import { CreateDailyInput } from './dto/create-daily.input';
import { UpdateDailyInput } from './dto/update-daily.input';
import { Daily } from './entities/daily.entity';

@Resolver(() => Daily)
export class DailyResolver {
  constructor(private readonly dailyService: DailyService) {}

  @Mutation(() => Int, { name: 'createManyDaily' })
  async createMany(
    @Args({ name: 'data', type: () => [CreateDailyInput] })
    data: CreateDailyInput[],
  ) {
    const result = await this.dailyService.createMany(data);
    return result.count;
  }

  @Query(() => [Daily], { name: 'getAllDaily' })
  async getAllDaily() {
    return this.dailyService.findAll();
  }

  @Query(() => Daily, { name: 'getDailyById', nullable: true })
  async findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.dailyService.findUnique(id);
  }

  @Mutation(() => Daily, { name: 'updateDaily' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateDailyInput,
  ) {
    return this.dailyService.update(id, data);
  }

  @Mutation(() => Daily, { name: 'deleteDaily' })
  async delete(@Args('id', { type: () => Int }) id: number) {
    return this.dailyService.delete(id);
  }
}
