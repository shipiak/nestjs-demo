import {Component} from '@nestjs/common/utils/decorators/component.decorator';
import {Breed} from "../entity/breed";
import {IBreedService} from "./breed.service.interface";

@Component()
export class BreedServiceMock implements IBreedService {

    public dogs: Breed[] = [
        {id: 0, name: 'stafford'},
        {id: 1, name: 'mastiff'},
        {id: 2, name: 'cane corso'}
    ];

    async fetch(): Promise<Breed[]> {
        return this.dogs;
    }
}
