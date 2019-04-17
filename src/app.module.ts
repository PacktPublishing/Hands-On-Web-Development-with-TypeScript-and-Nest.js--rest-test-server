import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoapiModule } from './cryptoapi/cryptoapi.module';
import { RestapiModule } from './restapi/restapi.module';

@Module({
  imports: [CryptoapiModule, RestapiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
