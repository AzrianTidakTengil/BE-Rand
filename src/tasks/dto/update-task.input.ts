import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  priority?: number;

  @Field(() => Int, { nullable: true })
  type?: number;
}
