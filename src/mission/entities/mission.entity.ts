import { Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base.entity";
import { Driver } from "../../drivers/entities/driver.entity";
import { Vehicle } from "../../vehicle/entities/vehicule.entity";
import { MissionStatus } from "./mission-status.entity";

export class Mission extends BaseEntity{

   
  @ManyToOne(() => Driver, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
 
  @ManyToOne(() => Vehicle, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
 
  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'planned_departure_time', type: 'datetime', nullable: true })
  plannedDepartureTime: Date | null;
 
  @Column({ name: 'departure_time', type: 'datetime', nullable: true })
  departureTime: Date | null;
 
  @Column({ name: 'return_time', type: 'datetime', nullable: true })
  returnTime: Date | null;
 
  @ManyToOne(() => MissionStatus, { nullable: false})
  @JoinColumn({ name: 'status_id'})
  status: MissionStatus;
 
  @Column({ name: 'estimated_distance_km', type: 'float', default: 0 })
  estimatedDistanceKm: number;
 
  @Column({ name: 'estimated_duration_min', type: 'int', default: 0 })
  estimatedDurationMin: number;
 
  @Column({ name: 'estimated_fuel_l', type: 'float', default: 0 })
  estimatedFuelL: number;
 
  // Taux de remplissage en pourcentage (0 à 100)
  @Column({ name: 'fill_rate', type: 'float', default: 0 })
  fillRate: number;
 
  @Column({ name: 'total_weight_kg', type: 'float', default: 0 })
  totalWeightKg: number;
 
  @Column({ name: 'departure_mileage_km', type: 'float', nullable: true })
  departureMileageKm: number | null;
 
  @Column({ name: 'return_mileage_km', type: 'float', nullable: true })
  returnMileageKm: number | null;
 
  @Column({ type: 'text', nullable: true })
  observation: string | null;
 
  @Column({ name: 'is_accepted', type: 'boolean', default: false })
  isAccepted: boolean;
}
