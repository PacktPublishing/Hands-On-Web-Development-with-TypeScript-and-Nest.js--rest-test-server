import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HttpStrategy } from './http.strategy';

@Module({
    imports: [UsersModule],
    providers: [AuthService, HttpStrategy],
})
export class AuthModule { }
