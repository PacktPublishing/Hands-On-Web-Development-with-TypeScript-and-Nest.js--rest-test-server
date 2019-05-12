import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';

@Module({
    providers: [UsersService],
    // export the service provider to use it when importing this module
    exports: [UsersService],
})
export class UsersModule { }
