import {Interceptor, NestInterceptor, ExecutionContext, Inject, Request} from '@nestjs/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {LOGGER} from "../components/logger/logger.factory";
import {Logger} from "../components/logger/logger";

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(LOGGER) private logger: Logger) {
    }

    intercept(dataOrRequest,
              context: ExecutionContext,
              stream$: Observable<any>,): Observable<any> {
        const start = Date.now();
        return stream$.do(() => this.log(dataOrRequest, context, Date.now() - start));
    }

    log(data: Request | any, context: ExecutionContext, time: number) {
        const isRequest = data.method && data.headers;
        if(isRequest)
            this.logger.log(`REQUEST ${data.method} ${data.baseUrl}${data.url} | ${time}ms`)
        else
            this.logger.log(`RPC ${context.handler.name}(${data}) | ${time}ms`);
    }
}
