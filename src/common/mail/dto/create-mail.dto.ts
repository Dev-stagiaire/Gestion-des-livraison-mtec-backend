import { IsString } from "class-validator";

export class CreateMailDto{

    @IsString()
    sendTo: string;

    @IsString()
    subject: string;

    @IsString()
    template: string;

    @IsString()
    context?: {};
}