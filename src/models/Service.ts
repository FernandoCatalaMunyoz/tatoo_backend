import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";

@Entity("services")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "services_name" })
  servicesName!: string;

  @Column({ name: "description" })
  description!: string;

  @OneToMany(() => Appointment, (appointments) => appointments.service)
  appointments!: Appointment[];
}
