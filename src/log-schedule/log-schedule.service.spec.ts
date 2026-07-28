import { Test, TestingModule } from '@nestjs/testing';
import { LogScheduleService } from './log-schedule.service';

describe('LogScheduleService', () => {
  let service: LogScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogScheduleService],
    }).compile();

    service = module.get<LogScheduleService>(LogScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
