import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { User } from "../../user/entities/user.entity";

@Entity('customers')
export class Customer extends BaseEntity{

    @Column({ name: 'ebp_id'})
    ebpId: string;

    @Column({ name: 'ebp_updated_at', type: 'timestamptz'})
    ebpUpdatedAt: Date;

    @Column({ name: 'user_id'})
    userId: number;

    @OneToOne(() => User, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column()
    name: string;

    @Column()
    civility: string;

    @Column()
    company: string;

    @Column()
    country: string;

    @Column()
    city: string;
}
