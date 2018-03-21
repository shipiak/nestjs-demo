import {Component} from "@nestjs/common";
import {Dog} from "../entity/dog";
import {DogUpdateDto} from "../entity/dogUpdate.dto";

@Component()
export class DogsRepository {

    private dogs: Dog[] = [
        {id: 0, age: 3, name: 'Max', breedId: 1},
        {id: 1, age: 1, name: 'Bradley', breedId: 0},
        {id: 2, age: 2, name: 'Tim', breedId: 2},
        {id: 3, age: 2, name: 'Buddy', breedId: 1},
        {id: 4, age: 3, name: 'Pilsner', breedId: 0},
        {id: 5, age: 6, name: 'Stanley', breedId: 1},
    ];

    constructor() {
    }

    async getDogs(): Promise<Dog[]> {
        return this.dogs;
    }

    async getDogById(id: number): Promise<Dog | undefined> {
        return this.dogs.find(dog => dog.id == id);
    }

    async createDog(dog: Dog): Promise<Dog> {
        dog.id = this.dogs.length;
        this.dogs.push(dog);
        return dog;
    }

    async deleteDog(id: number): Promise<void> {
        this.dogs = this.dogs.filter(dog => dog.id != id);
    }

    async updateDog(id: number, dogUpdate: DogUpdateDto): Promise<Dog | undefined> {
        const dog = this.dogs.find(d => d.id == id);
        if (!dog) return;
        dog.name = dogUpdate.name;
        dog.age = dogUpdate.age;
        return dog;
    }

}
