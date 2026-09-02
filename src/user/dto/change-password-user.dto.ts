import { IsString, MinLength } from "class-validator";

export class ChangePasswordUserDto{

    @IsString()
    @MinLength(6)
    new_password: string;
}