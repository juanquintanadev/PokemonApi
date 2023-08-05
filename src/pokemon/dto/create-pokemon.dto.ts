import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";


export class CreatePokemonDto {

    // is int positive min value 1
    @IsInt()
    @IsPositive()
    @Min(1, {
        message: 'is int positive min value 1'
    })
    no: number;


    // is string minlength 1
    @IsString()
    @MinLength(1, {
        message: 'is string minlength 1'
    })
    name: string;
}
