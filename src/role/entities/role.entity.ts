import { permission } from "process";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { Permission } from "../../permission/entities/permission.entity";

@Entity("role")
export class Role extends BaseEntity{

    @Column({unique: true, nullable: false})
    name: string;

    @ManyToMany(() => Permission, permission => permission.roles, {eager: true})
    @JoinTable()
    permissions: Permission[];
}
