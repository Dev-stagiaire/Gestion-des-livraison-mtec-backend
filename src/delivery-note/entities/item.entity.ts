import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity('product')
export class Product extends BaseEntity {

  @Index({ unique: true })
  @Column({ name: 'ebp_id' })
  ebpId: string;           

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  height: number | null;

  @Column({ type: 'float', nullable: true })
  width: number | null;

  @Column({ type: 'float', nullable: true })
  length: number | null;

  @Column({ type: 'float', nullable: true })
  volume: number | null;

  @Column({ name: 'volume_unit_id', type: 'varchar', nullable: true })
  volumeUnitId: string | null;

  @Column({ type: 'float', nullable: true })
  weight: number | null;

  @Column({ name: 'net_weight', type: 'float', nullable: true })
  netWeight: number | null;
}