import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules")
export default class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;
}
