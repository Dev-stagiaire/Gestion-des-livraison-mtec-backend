import { BaseEntity } from "src/base.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

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



}
