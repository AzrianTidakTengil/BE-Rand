import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyResolver } from './weekly.resolver';

describe('WeeklyResolver', () => {
  let resolver: WeeklyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyResolver],
    }).compile();

    resolver = module.get<WeeklyResolver>(WeeklyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
