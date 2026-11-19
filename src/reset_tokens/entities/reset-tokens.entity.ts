import { IsDate, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Timestamp } from "typeorm/driver/mongodb/bson.typings.js";
import { BaseEntity } from "../../base.entity";
import { User } from "../../user/entities/user.entity";

@Entity("reset_tokens")
export class ResetTokens extends BaseEntity{

    @ManyToOne(() => User, {eager: true})
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column({nullable: false})
    hash_token: string;
    
    @Column({type: 'timestamptz', nullable: false,})
    expired_at: Date;

    
    @Column({type: 'timestamptz', nullable: true,})
    use_at: Date | null;

    @Column({nullable: true})
    context?: string;

    @Column({nullable: false})
    item: string;
}