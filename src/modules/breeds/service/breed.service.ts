import {Component} from '@nestjs/common/utils/decorators/component.decorator';
import * as request from 'request-promise';
import {Breed} from "../entity/breed";
import {IBreedService} from "./breed.service.interface";

@Component()
export class BreedService implements IBreedService {

    private rp = request.defaults({
        baseUrl: 'https://dog.ceo/api',
        json: true
    });

    async fetch(): Promise<Breed[]> {
        const animals = await this.rp.get('/breeds/list');
        return animals.message.map((v, k) => ({id: k, name: v}));
    }
}
