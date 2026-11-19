import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { inspect } from "util";
import { UserService } from "../../user/user.service";
import { ROLES } from "../../common/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService,

    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = await this.reflector.getAllAndOverride(ROLES,[
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (!roles) return true;

        const { user } = context.switchToHttp().getRequest();

        // console.dir(user, {depth: null});

        const user_ = await this.userService.findById(user.sub);
        // console.log("REAL USER ==============");
        // console.dir(user_, {depth: null});

        if(!user_) throw new NotFoundException("Utilisateur introuvable");

        return roles.every(role => role === user_.role.name); 
    }
    
}