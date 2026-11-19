import { IsDate, IsNumber } from "class-validator";

export class DeliveryNoteGroup{

    @IsDate()
    date: Date;

    @IsNumber()
    count: number;

}