import { IsString, MinLength } from "class-validator";

export class ChangeEmailDto{

    @IsString()
    new_email: string;

    @IsString()
    @MinLength(6)
    otp_token: string;
}