import {Module} from "@nestjs/common";
import {BreedsController} from "./breeds.controller";
import {BreedRepository} from "./repository/breed.repository";
import {breedServiceFactory} from "./service/breed.service.factory";

@Module({
    components: [breedServiceFactory, BreedRepository],
    controllers:[BreedsController]
})

export class BreedsModule {}
