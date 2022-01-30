import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    if (request.accepts('html')){
      this.handleWebRequestExceptions(response, request, status)
    } else {
      this.handleApiRequestExceptions(response, request, status);
    }
  }

  private handleWebRequestExceptions(response: Response, request: Request, status: number) {
    switch (status) {
      case 404:
        response.render('404');
        break;
      case 403:
      case 401:
        response.redirect('/auth/login')
        break;
    }
  }

  private handleApiRequestExceptions(response: Response, request: Request, status: number) {
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
  
}