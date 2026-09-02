import { Permission } from "src/permission/entities/permission.entity";
import { Role } from "src/role/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

export default class AdminRolePermissions implements Seeder{

    async run(dataSource: DataSource){

        const role = await dataSource.getRepository(Role).findOne({
            where: { name: 'ADMIN'},
            relations: ['permissions'],
        });

        const permissions = await dataSource.getRepository(Permission).find();

        if(!role || !permissions){
           throw new Error("Role or permissions doesn t exist");
        }

        const permissions_to_add = (await permissions).filter(
            permissions_ => !role.permissions.some(
                role_permission => role_permission.id === permissions_.id
        ));

        await dataSource
            .createQueryBuilder()
            .relation(Role, "permissions")
            .of(role)        
            .add(permissions_to_add); 
        
        console.log(true);
    }
}