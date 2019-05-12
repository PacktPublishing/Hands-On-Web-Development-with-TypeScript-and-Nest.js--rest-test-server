import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(token: string) {
        // validate if token associated with account and store it
        const user = await this.authService.validateUser(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
