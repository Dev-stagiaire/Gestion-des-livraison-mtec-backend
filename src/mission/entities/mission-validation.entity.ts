import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { User } from "../../user/entities/user.entity";
import { Mission } from "./mission.entity";

@Entity('mission_validation')
export class MissionValidation extends BaseEntity{

    @Column({ name: 'mission_id' })
    missionId: number;

    @OneToOne(() => Mission)
    @JoinColumn({ name: 'mission_id'})
    mission: Mission;

    @Column({type: 'varchar', length:'20'})
    type: "closure" | "delivery_plan"

    @Column({ name: 'validate_by', type: 'number'})
    validatedBy: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'validate_by'})
    validatedByUser: User;

    @Column({ name: 'validated_at', type: 'timestamptz'})
    validatedAt: Date;
}