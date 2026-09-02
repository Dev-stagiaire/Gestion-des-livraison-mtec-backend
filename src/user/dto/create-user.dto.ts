import { IsEmail, IsNumber, IsOptional, isString, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

        @IsString()
        first_name: string;

        @IsOptional()
        @IsString()
        last_name?: string;

        @IsString()
        @IsEmail()
        @MinLength(6)
        email: string;

        @IsString()
        avatar_url: string

        @IsString()
        @IsStrongPassword()
        password: string;

        @IsString()
        phone: string;

        @IsNumber()
        role_id?: number;
}
