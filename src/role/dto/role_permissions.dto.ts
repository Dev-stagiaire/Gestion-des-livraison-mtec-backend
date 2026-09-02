import { IsNumber } from "class-validator";

export class RolePermissionsDto{

    @IsNumber()
    role_id: number;

    @IsNumber()
    permission_id: number;
}