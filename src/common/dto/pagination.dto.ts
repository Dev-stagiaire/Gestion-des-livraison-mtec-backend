import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @Min(3)
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @Min(0)
    offset: number;
}