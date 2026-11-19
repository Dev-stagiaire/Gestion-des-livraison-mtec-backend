import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Product } from "./item.entity";
import { DeliveryNote } from "./delivery-note.entity";
import { BaseEntity } from '../../base.entity';

@Entity('delivery_note_line')
export class DeliveryNoteLine extends BaseEntity {
    @Index({ unique: true })
    @Column({ name: 'ebp_id' })
    ebpId: string;                     

    @Column({ name: 'document_ebp_id' })
    documentId: number;            

    @Column({ name: 'delivery_note_id' })   
    deliveryNoteId: number;

    @ManyToOne(() => DeliveryNote, (n) => n.lines, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'delivery_note_id' })
    deliveryNote: DeliveryNote;  

    @Column({ name: 'product_id', type: 'int', nullable: true })
    productId: number | null;

    @ManyToOne(() => Product, { nullable: true })
    @JoinColumn({ name: 'product_id' })
    ebpItem: Product | null;

    @Column({ name: 'line_type', type: 'int' })
    lineType: number;

    @Column({ type: 'float', default: 0 })
    quantity: number;
}