import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("base_entity")
export abstract class BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({nullable: true})
    is_deleted: boolean;

    @DeleteDateColumn()
    deleted_at: Date;

}