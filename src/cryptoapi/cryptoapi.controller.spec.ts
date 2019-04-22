import { Test, TestingModule } from '@nestjs/testing';
import { CryptoapiController } from './cryptoapi.controller';

describe('Cryptoapi Controller', () => {
  let controller: CryptoapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoapiController],
    }).compile();

    controller = module.get<CryptoapiController>(CryptoapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
