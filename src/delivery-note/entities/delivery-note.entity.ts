import { Column, Entity, Index, JoinColumn, OneToMany, Unique } from "typeorm";
import { DeliveryNoteLine } from "./delivery-note-line.entity";
import { BaseEntity } from "../../base.entity";

@Entity("delivery_note")
export class DeliveryNote extends BaseEntity{

    @Index({ unique: true})
    @Column({ name: "ebp_id"})
    ebpId: string;

    @Column({ name: "document_number"})
    documentNumber: string;

    @Column({ type: "timestamptz", name: "document_date"})
    documentDate: Date;

    @Column({ name: "document_type", nullable: true})
    documentType: string;

    @Column({ name: "ebp_updated_at", type: "timestamptz"})
    ebpUpdatedAt: Date;

    @Column({ name: 'customer_id'})
    customerId: number;

    @Column({ name: 'customer_name'})
    customerName: number;

    @Column({ type: "float", name: "total_weight", nullable: true })
    totalWeight: number | null;

    @Column({ type: "float", name: "total_volume", nullable: true })
    totalVolume: number | null;

    @Column({ type: "float", name: "total_net_weight", nullable: true })
    totolNetWeight: number | null;

    @Column({ type: "timestamptz", name: "delivery_date"})
    deliveryDate: Date;

    @Column({ name: "delivery_address"})
    deliveryAddress: string;

    @Column({ name: "delivery_state", type: 'varchar', nullable: true})
    deliveryState: string | null;

    @Column({ name: 'delivery_latitude', type: 'float', nullable: true })
    deliveryLatitude: number | null;

    @Column({ name: 'delivery_longitude', type: 'float', nullable: true })
    deliveryLongitude: number | null;

    @OneToMany(() => DeliveryNoteLine, (l) => l.deliveryNote)
    @JoinColumn({ name: "delivery_note_line_ids"})
    lines: DeliveryNoteLine[];

    status: number;
}