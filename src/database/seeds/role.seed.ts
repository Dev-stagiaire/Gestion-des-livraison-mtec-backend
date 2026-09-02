import { Generic } from "src/generic/generic.service";
import { Role } from "src/role/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension"

export default class RoleSeed implements Seeder{

    async run(dataSource: DataSource){
        const generic = new Generic();

        const roles = [
            'ADMIN',
            'CLIENT',
            'RESPONSABLE',
        ];

        const created = generic.createAfterCheck(dataSource, Role, 'name', roles);
    }


}