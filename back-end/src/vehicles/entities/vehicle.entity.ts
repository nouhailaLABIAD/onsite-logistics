import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type VehicleStatus = "active" | "maintenance";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @Column({ default: "active" })
  status: VehicleStatus;

  @Column({ nullable: true })
  driverId: number;
}