import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDailyInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  startTime?: Date;

  @Field({ nullable: true })
  endTime?: Date;
}
