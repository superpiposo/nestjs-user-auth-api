import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class Response_Interceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;
    if (statusCode === 200 || statusCode === 201 || 202) {
      return next.handle().pipe(
        map((data) => ({
          status: statusCode,
          data,
          success: true,
        })),
      );
    } else {
      return next.handle();
    }
  }
}
