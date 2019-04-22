import { Module } from '@nestjs/common';
import { CryptoapiService } from './cryptoapi.service';
import { CryptoapiController } from './cryptoapi.controller';

@Module({
  controllers: [CryptoapiController],
  providers: [CryptoapiService],
})
export class CryptoapiModule {}
