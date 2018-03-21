import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {ApplicationInitialization} from "./app.init";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    await app.select(ApplicationModule).get(ApplicationInitialization).init(app);
}

bootstrap();
