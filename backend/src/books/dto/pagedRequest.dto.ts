import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PagedRequest {
    @IsOptional()
    title?: string;

    @Min(1)
    @IsInt()
    @Type(() => Number)
    page: number = 1;

    @Min(1)
    @IsInt()
    @Type(() => Number)
    limit: number = 10;
}