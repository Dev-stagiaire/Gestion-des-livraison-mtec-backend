import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {

    @IsNumber()
    user_id: number;

    @IsString()
    name: string;

    @IsString()
    company: string;

    @IsString()
    address: string;

    @IsString()
    post_code: string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsString()
    phone1: string;

    @IsString()
    phone2: string;

    @IsEmail()
    email: string;
}
