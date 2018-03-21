import {
    Get, Controller, Param, NotFoundException, Post, Body, HttpCode, Put, UseInterceptors,
    UsePipes, Patch, HttpStatus
} from '@nestjs/common';
import {Client, ClientProxy} from "@nestjs/microservices";
import {Transport} from "@nestjs/common/enums/transport.enum";
import 'rxjs/add/operator/toPromise';
import {Dog} from "./entity/dog";
import {DogsRepository} from "./repository/dogs.repository";
import {DogCreateDto} from "./entity/dogCreate.dto";
import {DogUpdateDto} from "./entity/dogUpdate.dto";
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";
import {ValidationPipe} from "../../common/pipes/validation.pipe";


@Controller('dogs')
@UseInterceptors(LoggingInterceptor)
@UsePipes(new ValidationPipe())
export class DogsController {

    @Client({transport: Transport.TCP, port: 9999})
    breedsRpc: ClientProxy;

    constructor(private dogRepository: DogsRepository) {
    }

    @Get()
    async getDogs(): Promise<Dog[]> {
        return await this.dogRepository.getDogs();
    }

    @Get(':id')
    async getDogById(@Param('id') id: number) {
        const dog = await this.dogRepository.getDogById(id);
        if (!dog) throw new NotFoundException();
        const breed = await this.breedsRpc.send('getBreedById', dog.breedId).toPromise();
        return {...dog, breed};
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createDog(@Body() dogCreateDto: DogCreateDto) {
        const dog = await this.dogRepository.createDog(dogCreateDto);
        const breed = await this.breedsRpc.send('getBreedById', dog.breedId).toPromise();
        return {...dog, breed}
    }

    @Patch(':id')
    async updateDog(@Param('id') id: number, @Body() dogUpdateDto: DogUpdateDto) {
        const dog = await this.dogRepository.updateDog(id, dogUpdateDto);
        const breed = await this.breedsRpc.send('getBreedById', dog.breedId).toPromise();
        return {...dog, breed};
    }
}
