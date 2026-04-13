import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pickupLocation!: string;

  @Column()
  dropoffLocation!: string;

  @Column({ default: 'pending' })
  status!: 'pending' | 'accepted' | 'in_progress' | 'completed';

  @Column()
  priority!: 'low' | 'medium' | 'high';

  @Column({ nullable: true })
  driverId!: number;


@Column({ nullable: true })
receiverId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}