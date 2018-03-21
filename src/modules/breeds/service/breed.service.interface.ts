import {Breed} from "../entity/breed";

export interface IBreedService {
    fetch(): Promise<Breed[]>;
}
