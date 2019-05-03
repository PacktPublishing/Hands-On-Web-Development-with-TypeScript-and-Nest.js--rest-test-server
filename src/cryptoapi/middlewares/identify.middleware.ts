import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { v4 as uuid } from 'uuid';

@Injectable()
export class IdentifyMiddleware implements NestMiddleware {
    // required method to implement a middleware
    use(req: Request, res: Response, next: NextFunction) {
        // add an uuid to the object on the request body
        req.body.id = uuid();
        (req as any).isAuth = true;

        // let the request pass through to the handler
        next();
    }
}
