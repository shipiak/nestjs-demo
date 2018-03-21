import {ApiModelPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsString, Max, Min} from "class-validator";

export class DogUpdateDto {

    @ApiModelPropertyOptional()
    @IsString()
    readonly name: string;

    @ApiModelPropertyOptional()
    @IsNumber()
    @Min(0)
    @Max(30)
    readonly age: number;
}
