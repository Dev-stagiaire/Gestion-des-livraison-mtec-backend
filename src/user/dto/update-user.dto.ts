import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

            @IsString()
            first_name?: string;
    
            @IsOptional()
            @IsString()
            last_name?: string;

            @IsOptional()
            @IsString()
            avatar_url?: string

            @IsOptional()
            @IsString()
            phone?: string;

            @IsOptional()
            @IsNumber()
            role_id?: number;

            @IsString()
            otp_token?: string
}
