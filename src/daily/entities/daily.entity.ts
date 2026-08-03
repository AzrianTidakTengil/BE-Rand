import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Daily {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;
}
