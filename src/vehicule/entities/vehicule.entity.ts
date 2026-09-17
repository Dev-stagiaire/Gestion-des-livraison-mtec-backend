import { Column, PrimaryColumn } from "typeorm";

export class Vehicle {

    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    immatriculation: string;

    @Column({ nullable: true })
    type: number;

    @Column({ nullable: true })
    marque: string;

    @Column({ name: "charge supportée", nullable: true })
    charge_supportee: string;

    @Column({ nullable: true })
    consommation: string;

    @Column({ nullable: true })
    statut: number;

    @Column({ type: "bigint", nullable: true })
    odo: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    imei: string;

    @Column({ nullable: true })
    port: string;

    @Column({ nullable: true })
    ip: string;

    @Column({ nullable: true })
    active: boolean;

    @Column({ nullable: true })
    expire: boolean;

    @Column({ nullable: true })
    expire_dt: Date;

    @Column({ nullable: true })
    device: string;

    @Column({ nullable: true })
    sim_number: string;

    @Column({ nullable: true })
    model: string;

    @Column({ nullable: true })
    vin: string;

    @Column({ nullable: true })
    plate_number: string;
}
