import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    // is int positive min value 1
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;


    // is string minlength 1
    @IsOptional()
    @IsPositive()
    skip?: number;
}