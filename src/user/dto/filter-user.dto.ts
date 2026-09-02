import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FilterUserDto{

    @IsOptional()
    @Type(() => String)
    @IsString()
    role?: string;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    is_active?: boolean;
}