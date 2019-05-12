import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDb } from 'src/users/database/user-db';

@Injectable()
export class UsersService {
    findOneByToken(token: string) {
        // very simple example

        // validate token
        // In the real world: verify the signature of the token is valid
        // with OAuth or similar libraries
        if (token !== 'supersecrettoken') {
            throw new UnauthorizedException('Wrong token');
        }

        // return associated user
        // In the real world: based on data inside valid token retrieve the user
        // from the database
        return UserDb.get('toto');
    }
}
