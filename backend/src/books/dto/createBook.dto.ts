import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateBookDto{
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    title:string;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @Min(1000)
    @Max(2100)
    year?: number;

    @IsString()
    @MaxLength(100)
    description?:string
}