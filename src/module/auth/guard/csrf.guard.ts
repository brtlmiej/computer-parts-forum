import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CsrfGuard implements CanActivate{
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.body._csrf == request.session.csrf;
  }
}