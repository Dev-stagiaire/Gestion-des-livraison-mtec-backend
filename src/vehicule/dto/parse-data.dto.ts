import { IsEmail } from "class-validator";
import { ApiDto } from "./api.dto";

export class ParseDataDto extends ApiDto {
    @IsEmail()
    customer_email: string;
}