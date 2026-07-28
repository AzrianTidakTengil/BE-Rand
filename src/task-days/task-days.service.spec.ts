import { Test, TestingModule } from '@nestjs/testing';
import { TaskDaysService } from './task-days.service';

describe('TaskDaysService', () => {
  let service: TaskDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskDaysService],
    }).compile();

    service = module.get<TaskDaysService>(TaskDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
