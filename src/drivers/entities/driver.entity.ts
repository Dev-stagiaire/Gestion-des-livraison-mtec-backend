import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { User } from "../../user/entities/user.entity";

@Entity('drivers')
export class Driver extends BaseEntity{

    @Column({ name: 'user_id'})
    userId: number

    @OneToOne(() => User, (u) => u.driver, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column({ name: 'name'})
    name: string;

    @Column()
    matricule: string;

    @Column({ name: 'license_number'})
    licenseNumber: string;

    @Column({ name: 'license_validated'})
    licenseValidated: string;

    @Column({ name: "statusId"})
    statusId: number

}
