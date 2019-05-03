import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

@Injectable()
export class IdentifyMiddleware implements NestMiddleware {
    // required method to implement a middleware
    use(req: Request, res: Response, next: NextFunction) {
        (req as any).isAuth = true;

        // let the request pass through to the handler
        next();
    }
}
