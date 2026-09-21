import { BaseEntity } from "src/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("customer")
export class Customer extends BaseEntity {

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column()
    name: string;

    @Column()
    company: string;

    @Column()
    address: string;

    @Column()
    post_code: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    phone1: string;

    @Column({ nullable: true })
    phone2: string;

    @Column({ unique: true})
    email: string;
}
