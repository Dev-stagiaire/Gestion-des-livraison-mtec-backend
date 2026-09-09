import { IsArray, IsNumber } from "class-validator";
import { Permission } from "src/permission/entities/permission.entity";

export class RolePermissionsDto{

    @IsNumber()
    role_id: number;

    @IsArray()
    permissions: Permission[];
}