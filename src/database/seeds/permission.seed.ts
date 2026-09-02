import { Generic } from "src/generic/generic.service";
import { Permission } from "src/permission/entities/permission.entity";
import { DataSource } from "typeorm/browser";
import { Seeder } from "typeorm-extension";
import { Role } from "src/role/entities/role.entity";
import { permission } from "process";

export default class PermissionSeed implements Seeder{


    async run(dataSource: DataSource){
        const generic = new Generic();

        const permissions= [

            'CREATE_ROLE',
            'UPDATE_ROLE',
            'READ_ROLE',
            'DELETE_ROLE',

            'CREATE_PERMISSION',
            'UPDATE_PERMISSION',
            'READ_PERMISSION',
            'DELETE_PERMISSION',

            'CREATE_USER',
            'UPDATE_USER',
            'READ_USER',
            'DELETE_USER',
        ];

        let permissions_saved = await generic.createAfterCheck(dataSource, Permission, 'name', permissions);

    }


}