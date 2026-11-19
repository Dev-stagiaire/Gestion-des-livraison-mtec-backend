import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension"
import { Generic } from "../../generic/generic.service";
import { Role } from "../../role/entities/role.entity";

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