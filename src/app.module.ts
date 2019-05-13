import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoapiModule } from './cryptoapi/cryptoapi.module';
import { RestapiModule } from './restapi/restapi.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CryptoapiModule,
    RestapiModule,
    AuthModule,
    UsersModule,
    // forRoot() method accepts the same configuration object as mongoose.connect()
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
