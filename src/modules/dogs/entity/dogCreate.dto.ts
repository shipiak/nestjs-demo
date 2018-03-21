import {ApiModelProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Max, Min} from "class-validator";

export class DogCreateDto {

    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsNumber()
    @Min(0)
    @Max(25, { message: 'Come on, have you ever seen a dog that old???'})
    readonly age: number;

    @ApiModelProperty()
    @IsNumber()
    @Min(0)
    readonly breedId: number;
}
