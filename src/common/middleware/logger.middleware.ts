import {Inject, Middleware, NestMiddleware} from "@nestjs/common";
import {ExpressMiddleware} from "@nestjs/common/interfaces/middlewares/express-midleware.interface";
import {LOGGER} from "../components/logger/logger.factory";
import {Logger} from "../components/logger/logger";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject(LOGGER) private logger: Logger){
    }

    resolve(...args: any[]): ExpressMiddleware {
        return (req: Request, res, next) => {
            this.logger.log(`Request ${req.method} ${req.url}`);
            next();
        };
    }
}
