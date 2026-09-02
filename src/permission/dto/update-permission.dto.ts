import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsString } from 'class-validator';

export class UpdatePermissionDto {

    @IsString()
    name: string;
}
