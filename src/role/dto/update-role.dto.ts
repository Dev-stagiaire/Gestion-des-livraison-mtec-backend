import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsArray, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    
    @IsString()
    name: string;

    @IsArray()
    permission_ids: number[];
}
