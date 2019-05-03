import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CryptoapiService } from './cryptoapi.service';
import { CryptoapiController } from './cryptoapi.controller';
import { IdentifyMiddleware } from './middlewares/identify.middleware';

@Module({
  controllers: [CryptoapiController],
  providers: [CryptoapiService],
})
export class CryptoapiModule implements NestModule {
  // required method to apply middlewares
  configure(consumer: MiddlewareConsumer) {
    // ovject with helper methods for managing middlewares
    consumer
      // which middlewares to apply (can pass a list of middlewares)
      .apply(IdentifyMiddleware)
      // restrict the middlewares to specific requests
      .forRoutes(CryptoapiController);
  }
}
