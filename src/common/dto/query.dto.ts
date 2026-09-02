import { IntersectionType } from "@nestjs/mapped-types";
import { FilterUserDto } from "src/user/dto/filter-user.dto";
import { PaginationDto } from "./pagination.dto";
import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class QueryDto extends IntersectionType(FilterUserDto, PaginationDto){

    @IsOptional()
    @Type(() => String)
    @IsString()
    search_term: string;
}