import { BaseEntity } from "src/base.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity("permission")
export class Permission extends BaseEntity {

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}
