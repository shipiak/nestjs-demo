import * as express from 'express';
import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {BreedsModule} from "./breeds.module";
import {BreedServiceMock} from "./service/breed.service.mock";
import {CommonModule} from "../../common/common.module";
import {BREED_SERVICE} from "./service/breed.service.factory";

describe('breeds controller e2e', () => {
    const server = express();
    const breedServiceMock = new BreedServiceMock();

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                CommonModule,
                BreedsModule
            ],
        })
            .overrideComponent(BREED_SERVICE).useValue(breedServiceMock)
            .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it(`should GET /breeds`, () => {
        return request(server)
            .get('/breeds')
            .expect(200)
            .expect(breedServiceMock.dogs);
    });

    it(`should GET /breeds/0`, () => {
       return request(server)
           .get('/breeds/0')
           .expect(200)
           .expect(breedServiceMock.dogs[0])
    });

    it(`should fail 404 GET /breeds/4`, () => {
        return request(server)
            .get('/breeds/4')
            .expect(404)
    });
});
