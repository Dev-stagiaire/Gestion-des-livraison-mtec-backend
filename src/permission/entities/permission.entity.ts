import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { Role } from "../../role/entities/role.entity";

@Entity("permission")
export class Permission extends BaseEntity {

    @Column({unique: true})
    name!: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles!: Role[];
}
