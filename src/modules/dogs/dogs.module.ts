import {Module} from "@nestjs/common";
import {DogsController} from "./dogs.controller";
import {DogsRepository} from "./repository/dogs.repository";


@Module({
    components: [DogsRepository],
    controllers:[DogsController]
})

export class DogsModule {}
