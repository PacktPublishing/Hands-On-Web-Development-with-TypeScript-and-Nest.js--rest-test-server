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
      // exclude specific requests from passing through the middlewares
      .exclude(
        { path: 'cryptoapi', method: RequestMethod.GET },
        { path: 'cryptoapi', method: RequestMethod.DELETE },
      )
      // restrict the middlewares to specific requests
      .forRoutes(CryptoapiController);
  }
}
