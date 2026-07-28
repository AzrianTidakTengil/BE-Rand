import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  name!: string;

  @Field(() => Int)
  priority!: number;

  @Field(() => Int)
  type!: number;
}
