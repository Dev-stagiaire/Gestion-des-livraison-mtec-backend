import { Role } from "src/role/entities/role.entity";

export class UserResponseDto {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    avatar_url: string | null;
    role: Role;
    is_active: boolean;
}