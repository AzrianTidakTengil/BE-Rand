import { Test, TestingModule } from '@nestjs/testing';
import { LogScheduleResolver } from './log-schedule.resolver';

describe('LogScheduleResolver', () => {
  let resolver: LogScheduleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogScheduleResolver],
    }).compile();

    resolver = module.get<LogScheduleResolver>(LogScheduleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
