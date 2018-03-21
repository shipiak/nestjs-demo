import {Test} from '@nestjs/testing';
import {IBreedService} from "../service/breed.service.interface";
import {CommonModule} from "../../../common/common.module";
import {BreedsModule} from "../breeds.module";
import {BREED_SERVICE} from "../service/breed.service.factory";
import {BreedServiceMock} from "../service/breed.service.mock";
import {BreedRepository} from "./breed.repository";
import {TestingModule} from "@nestjs/testing/testing-module";
import {Logger} from "../../../common/components/logger/logger";
import {LOGGER} from "../../../common/components/logger/logger.factory";


describe('breeds repository', () => {
    const breedServiceMock = new BreedServiceMock();
    let breedRepository: BreedRepository = null;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                CommonModule,
                BreedsModule
            ],
        })
            .overrideComponent(BREED_SERVICE).useValue(breedServiceMock)
            .compile();

        breedRepository = module.select(BreedsModule).get<BreedRepository>(BreedRepository);
    });

    it(`should get all breeds`, async () => {
        expect(await breedRepository.getBreeds()).toBe(breedServiceMock.dogs);
    });

    it(`should get breed by id`, async () => {
        expect(await breedRepository.getBreedById(0)).toBe(breedServiceMock.dogs[0]);
    });

    it(`should return undefined if breedId not found`, async () => {
        expect(await breedRepository.getBreedById(5)).toBeUndefined();
    });
});
