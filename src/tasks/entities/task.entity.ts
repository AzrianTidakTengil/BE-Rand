import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field(() => Int)
  priority!: number;

  @Field(() => Int)
  type!: number;
}
