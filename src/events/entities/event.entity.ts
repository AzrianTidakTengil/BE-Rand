import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}
