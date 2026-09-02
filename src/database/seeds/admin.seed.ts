import { Logger } from "@nestjs/common";
import { Generic } from "src/generic/generic.service";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

export default class AdminSeed implements Seeder{


    async run(dataSource: DataSource){

        const userRepository = dataSource.getRepository(User);
        const roleRepository = dataSource.getRepository(Role);
        const generic = new Generic();
        
        const adminRole = await roleRepository.findOne({
            where: {name: 'ADMIN'},
        })
        if (!adminRole) {
            throw new Error("Run role seed first.")
        }

        const admin_email = process.env.ADMIN_EMAIL || 'vanonanotahina@gmail.com';
        const existAdmin = await userRepository.findOne({
            where: { email: admin_email},
        });

        const password = await generic.hasher(process.env.ADMIN_PASSWORD || 'innoventis');

        if (!existAdmin) {
            
            const admin = userRepository.create({
                first_name: 'Admin',
                last_name: 'System',
                email: admin_email,
                password: password,
                phone:'0349948512',
                is_active: true,
                role: adminRole,
            });

            await userRepository.save(admin)
        }
        else{
            console.log('Admin user already exists');
        }
    }
}