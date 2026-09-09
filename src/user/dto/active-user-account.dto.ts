import { IsEmail, IsNumber, IsOptional, isString, IsString, IsStrongPassword, MinLength } from "class-validator";

export class activeUserAccountDto {

        @IsString()
        @IsStrongPassword()
        password1: string;

        @IsString()
        @IsStrongPassword()
        password2: string;
}
