import { IsBoolean, IsNumber } from "class-validator";

export class ValidateUserDto{

    @IsBoolean()
    is_active: boolean;
    
    @IsNumber()
    role_id: number;
}