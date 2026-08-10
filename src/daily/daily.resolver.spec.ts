import { Test, TestingModule } from '@nestjs/testing';
import { DailyResolver } from './daily.resolver';

describe('DailyResolver', () => {
  let resolver: DailyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyResolver],
    }).compile();

    resolver = module.get<DailyResolver>(DailyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
