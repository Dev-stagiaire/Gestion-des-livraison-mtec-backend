
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { Role } from "../../role/entities/role.entity";
import { Driver } from "../../drivers/entities/driver.entity";
import { Customer } from "../../customer/entities/customer.entity";

@Entity("users")
export class User extends BaseEntity{

    @Column()
    first_name: string;

    @Column({nullable: true})
    last_name?: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    avatar_url: string

    @Column()
    password: string;

    @Column({unique: true})
    phone: string;

    @Column({default: false})
    is_active: boolean;

    @ManyToOne(() => Role, { eager: true, nullable: true })
    @JoinColumn()
    role: Role;

    @Column({nullable: true})
    otp_token: string

    @Column({type: 'timestamp', nullable: true})
    password_changed_at: Date;


    @OneToOne(() => Driver)
    driver: Driver | null;

    @OneToOne(() => Customer)
    customer: Customer | null;

}
