import { Test, TestingModule } from '@nestjs/testing';
import { TaskDaysResolver } from './task-days.resolver';

describe('TaskDaysResolver', () => {
  let resolver: TaskDaysResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskDaysResolver],
    }).compile();

    resolver = module.get<TaskDaysResolver>(TaskDaysResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
