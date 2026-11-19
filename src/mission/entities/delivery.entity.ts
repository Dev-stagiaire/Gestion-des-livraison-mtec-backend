import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { DeliveryNote } from "../../delivery-note/entities/delivery-note.entity";
import { Mission } from "./mission.entity";

@Entity('delivery')
export class Delivery extends BaseEntity{

    @Column({ name: 'delivery_note_id'})
    deliveryNoteId: number;

    @OneToOne(() => DeliveryNote)
    @JoinColumn({ name: 'delivery_note_id'})
    deliveryNote: DeliveryNote;

    @Column({ name: 'mission_id'})
    missionId: number;

    @ManyToOne(() => Mission)
    @JoinColumn({ name: 'mission_id'})
    mission: Mission;

    @Column()
    rank: number;

    @Column()
    arrival: Date;

    @Column()
    status: number;
}