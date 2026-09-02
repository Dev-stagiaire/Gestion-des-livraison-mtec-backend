import { SetMetadata } from "@nestjs/common";

export const ROLES = "authorized_roles";

export const AuthorizedRoles = (...roles: string[]) => (SetMetadata(ROLES, roles));