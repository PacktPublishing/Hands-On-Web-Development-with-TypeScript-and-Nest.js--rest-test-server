import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// The @Catch() decorator tells Nest that this filter is looking for exceptions of type HttpException only
@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    // method required to fulfill the ExceptionFilter interface contract
    catch(
        // exception object currently being processed
        exception: HttpException,
        // wrapper around the arguments passed to the original Express request handler (array of arguments)
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception.getStatus();
        let message = exception.getResponse();
        message = (message as HttpException).message || (message as any).error;

        // custom error response
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
