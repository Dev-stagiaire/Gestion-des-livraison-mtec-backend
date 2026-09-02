import { AppDataSource } from "../data.source";
import AdminRolePermissions from "./admin.role.permissions.seed";
import AdminSeed from "./admin.seed";
import PermissionSeed from "./permission.seed";
import RoleSeed from "./role.seed";

export async function run(){

    const roleSeed = new RoleSeed();
    const permissionSeed = new PermissionSeed();
    const adminRolePermissions = new AdminRolePermissions();
    const adminSeed = new AdminSeed();

    await AppDataSource.initialize();
    console.log("tonga eto"); 

    await roleSeed.run(AppDataSource);

    await permissionSeed.run(AppDataSource);

    await adminRolePermissions.run(AppDataSource);

    await adminSeed.run(AppDataSource);

    await AppDataSource.destroy();
}

run();