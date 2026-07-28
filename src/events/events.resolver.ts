import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event], { name: 'getAllEvents' })
  async getAllEvents() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'getEventById', nullable: true })
  async findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findUnique(id);
  }
  @Mutation(() => Int, { name: 'createManyEvents' })
  async createMany(
    @Args({ name: 'data', type: () => [CreateEventInput] })
    data: CreateEventInput[],
  ) {
    const result = await this.eventsService.createMany(data);
    return result.count;
  }

  @Mutation(() => Event, { name: 'updateEvent' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateEventInput,
  ) {
    return this.eventsService.update(id, data);
  }

  @Mutation(() => Event, { name: 'deleteEvent' })
  async delete(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.delete(id);
  }
}
