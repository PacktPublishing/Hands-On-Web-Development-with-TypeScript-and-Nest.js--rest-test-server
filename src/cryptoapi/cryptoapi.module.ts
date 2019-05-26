import { Module, NestModule, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';
import { CryptoapiService } from './cryptoapi.service';
import { CryptoapiController } from './cryptoapi.controller';
import { IdentifyMiddleware } from './middlewares/identify.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { CryptoSchema } from './schemas/crypto.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CryptoapiController],
  providers: [CryptoapiService],
  imports: [
    AuthModule,
    // used to inject the Mongoose models inside the service provider
    MongooseModule.forFeature([
      { name: 'Crypto', schema: CryptoSchema },
    ]),
    // to be able to inject the HttpService in the module's services
    HttpModule,
  ],
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
