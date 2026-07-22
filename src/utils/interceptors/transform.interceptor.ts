import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response: { statusCode: number } = context
      .switchToHttp()
      .getResponse();
    const statusCode: number = response?.statusCode;

    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message: 'Success',
        data: data,
      })),
    );
  }
}
