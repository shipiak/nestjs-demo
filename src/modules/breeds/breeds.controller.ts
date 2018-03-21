import {Get, Controller, NotFoundException, UseInterceptors} from '@nestjs/common';
import {Client, ClientProxy, MessagePattern} from "@nestjs/microservices";
import {Breed} from "./entity/breed";
import {Param} from "@nestjs/common/utils/decorators/route-params.decorator";
import {BreedRepository} from "./repository/breed.repository";
import {Transport} from "@nestjs/common/enums/transport.enum";
import 'rxjs/add/operator/toPromise';
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";

/**
 * Controller implements public API for a module (REST or RPC),
 * it shouldn't contain any complex business logic, logic should be encapsulated in services
 */

@Controller('breeds')
@UseInterceptors(LoggingInterceptor)
export class BreedsController {

    constructor(private breedRepository: BreedRepository) {
    }

    @Get()
    @MessagePattern('getBreeds')
    async getBreeds(): Promise<Breed[]> {
        return await this.breedRepository.getBreeds();
    }

    @Get(':id')
    @MessagePattern('getBreedById')
    async getBreedById(@Param('id') id: number): Promise<Breed> {
        const breed = await this.breedRepository.getBreedById(id);
        if (!breed) {
            throw new NotFoundException();
        }
        return breed;
    }
}
