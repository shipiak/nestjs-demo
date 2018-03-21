import {IBreedService} from "./breed.service.interface";
import {BreedService} from "./breed.service";
import {CONFIG} from "../../../common/components/config/config.factory";
import {Config} from "../../../common/components/config/config";
import {BreedServiceMock} from "./breed.service.mock";

export const BREED_SERVICE = 'BreedServiceToken';

export const breedServiceFactory = {
    provide: BREED_SERVICE,
    useFactory: async (config: Config): Promise<IBreedService> => {
        return config.breedService.useMock ? new BreedServiceMock() : new BreedService();
    },
    inject: [CONFIG]
};
