import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type UserRole = "admin" | "driver" | "receiver";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "receiver" })
  role: UserRole;
  @Column({ nullable: true }) 
  pushToken: string;
}