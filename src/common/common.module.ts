import {Global, Module} from "@nestjs/common";
import {configFactory} from "./components/config/config.factory";
import {loggerFactory} from "./components/logger/logger.factory";

@Global()
@Module({
    components: [
        configFactory,
        loggerFactory
    ],
    exports: [
        configFactory,
        loggerFactory
    ]
})

export class CommonModule {}
