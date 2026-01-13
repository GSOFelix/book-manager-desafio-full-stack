import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    title: string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    author: string;

    @IsOptional()
    @IsNumber()
    @Min(1000)
    @Max(2100)
    year?: number;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string
}