import {Component, Inject} from "@nestjs/common";
import {Breed} from "../entity/breed";
import {BREED_SERVICE} from "../service/breed.service.factory";
import {IBreedService} from "../service/breed.service.interface";

@Component()
export class BreedRepository {

    constructor(@Inject(BREED_SERVICE) private breedService: IBreedService) {
    }

    async getBreeds(): Promise<Breed[]> {
        return await this.breedService.fetch();
    }

    async getBreedById(id: number): Promise<Breed | undefined> {
        const breeds = await this.getBreeds();
        return breeds.find(breed => breed.id == id);
    }
}
