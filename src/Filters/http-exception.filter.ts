import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

// custom exception filter
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // method required to fulfill the ExceptionFilter interface contract
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        let message = exception.getResponse();
        message = (message as BadRequestException).message;


        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                method: request.method,
                path: request.url,
                message,
            });
    }
}
