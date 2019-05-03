import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyAuthGuard implements CanActivate {
  // required method to fulfill the CanActivate contract
  canActivate(
    // ExecutionContext inherits from ArgumentsHost (wrapper around the arguments passed to the request handler)
    // provides details about the current execution process
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
    // return true;
  }

  // helper method
  validateRequest(request): boolean {
    return request.isAuth;
  }
}
