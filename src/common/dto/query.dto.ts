import { IntersectionType } from "@nestjs/mapped-types";
import { PaginationDto } from "./pagination.dto";
import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { FilterUserDto } from "../../user/dto/filter-user.dto";

export class QueryDto extends IntersectionType(FilterUserDto, PaginationDto){

    @IsOptional()
    @Type(() => String)
    @IsString()
    search_term: string;
}