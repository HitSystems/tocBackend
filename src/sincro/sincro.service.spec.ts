import { Test, TestingModule } from '@nestjs/testing';
import { SincroService } from './sincro.service';

describe('SincroService', () => {
  let service: SincroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SincroService],
    }).compile();

    service = module.get<SincroService>(SincroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
