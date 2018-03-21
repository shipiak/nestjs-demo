import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {BreedsModule} from "./modules/breeds/breeds.module";
import {CommonModule} from "./common/common.module";
import {ApplicationInitialization} from "./app.init";
import {DogsModule} from "./modules/dogs/dogs.module";
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import {BreedsController} from "./modules/breeds/breeds.controller";

@Module({
    imports: [
        BreedsModule,
        DogsModule,
        CommonModule
    ],
    components: [
        ApplicationInitialization
    ],
})
export class ApplicationModule {}


