import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDb } from 'src/users/database/user-db';

@Injectable()
export class UsersService {
    findOneByToken(token: string) {
        // validate token
        if (token !== 'supersecrettoken') {
            throw new UnauthorizedException('Wrong token');
        }

        // return associated user
        return UserDb.get('toto');
    }
}
