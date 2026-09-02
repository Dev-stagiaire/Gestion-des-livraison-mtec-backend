import { permission } from "process";
import { BaseEntity } from "src/base.entity";
import { Permission } from "src/permission/entities/permission.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity("role")
export class Role extends BaseEntity{

    @Column({unique: true, nullable: false})
    name: string;

    @ManyToMany(() => Permission, permission => permission.roles, {eager: true})
    @JoinTable()
    permissions: Permission[];
}
