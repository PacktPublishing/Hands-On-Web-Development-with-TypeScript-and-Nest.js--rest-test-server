import { Test, TestingModule } from '@nestjs/testing';
import { CryptoapiService } from './cryptoapi.service';

describe('CryptoapiService', () => {
  let service: CryptoapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoapiService],
    }).compile();

    service = module.get<CryptoapiService>(CryptoapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
