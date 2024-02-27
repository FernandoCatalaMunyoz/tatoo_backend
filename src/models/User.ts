import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Appointment } from "./Appointment";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name" })
  firstName!: "string";

  @Column({ name: "last_name" })
  lastName!: "string";

  @Column({ name: "email" })
  email!: "string";

  @Column({ name: "password_hash" })
  passwordHash!: "string";

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointment!: Appointment[];
}