import { IsEmail, IsNumber, IsOptional, isString, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

        @IsString()
        first_name: string;

        @IsString()
        @IsEmail()
        @MinLength(6)
        email: string;

        @IsString()
        phone: string;

        @IsNumber()
        role_id?: number;
}
