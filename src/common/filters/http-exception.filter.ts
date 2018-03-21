import {ExceptionFilter, Catch, Inject} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import {LOGGER} from "../components/logger/logger.factory";
import {Logger} from "../components/logger/logger";


/**
 * Catch unhandled exceptions and log them with logger
 */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(LOGGER) private logger: Logger){
    }

    catch(exception: HttpException, response) {
        const status = exception.getStatus();

        this.logger.error(JSON.stringify(exception, null, 4));

        response.status(status).json({
            statusCode: status,
            message: `Internal server error`,
        });
    }
}
