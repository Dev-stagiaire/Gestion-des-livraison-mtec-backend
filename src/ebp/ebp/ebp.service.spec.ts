import { Test, TestingModule } from '@nestjs/testing';
import { EbpService } from './ebp.service';

describe('EbpService', () => {
  let service: EbpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EbpService],
    }).compile();

    service = module.get<EbpService>(EbpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
