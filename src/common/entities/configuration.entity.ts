import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity('configuration')
export class Configuration extends BaseEntity{

    @Column()
    name: string;

    @Column()
    value: string
}