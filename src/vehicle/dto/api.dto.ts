import { IsEmail, IsString } from "class-validator";

export class ApiDto{

    @IsString()
    endpoint: string;

    @IsString()
    api: string;

    @IsString()
    key: string;

    @IsString()
    command: string;
}