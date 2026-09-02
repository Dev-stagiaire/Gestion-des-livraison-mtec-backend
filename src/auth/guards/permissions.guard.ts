import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from "src/common/decorators/required.permission.decorator";
import { permission } from "process";
import { dir } from "console";
import { UserService } from "src/user/user.service";

@Injectable()
export class PermissionsGuard implements CanActivate{

    constructor( private reflector: Reflector,
        private userService: UserService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const requiredPermissions = await this.reflector.getAllAndOverride(PERMISSION_KEY,[
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredPermissions) return true;

        const { user } = context.switchToHttp().getRequest();
        const user_ = await this.userService.findById(user.sub);
        
        if(!user_) throw new NotFoundException("User not found");

        // console.dir(user_);

        const user_permissions = user_.role
            .permissions
            .map(permission => permission.name);

        return requiredPermissions.every(permission => user_permissions.includes(permission));

    }
    
}