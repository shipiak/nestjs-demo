import {Component, INestApplication, Inject} from "@nestjs/common";
import {Config} from "./common/components/config/config";
import {CONFIG} from "./common/components/config/config.factory";
import {Transport} from "@nestjs/common/enums/transport.enum";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

/**
 * Initialization of app is in separate component to be able to inject a config
 */

@Component()
export class ApplicationInitialization {

    constructor(@Inject(CONFIG) private config: Config) {
    }

    async init(app: INestApplication): Promise<void> {

        // setup swagger docs on route '/swagger'
        const options = new DocumentBuilder()
            .setTitle('Demo NestJS service')
            .setDescription('Demo NestJS service API docs')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('/swagger', app, document);

        // connect rpc server
        app.connectMicroservice({
            transport: Transport.TCP,
            port: this.config.rpcServer.port
        });

        // start http and rpc server
        await app.startAllMicroservicesAsync();
        await app.listen(this.config.httpServer.port);
    }
}
