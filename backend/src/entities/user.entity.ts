import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity("user")
export class UserEntity extends CoreEntity {
  // @PrimaryGeneratedColumn("uuid")
  // uuid;
  @ObjectIdColumn()
  id: string; // MongoDB ObjectId column


  @Column({ type: "varchar", nullable: true })
  username;
  @Column({ type: "varchar", nullable: false })
  email;
  @Column({ type: "varchar", nullable: false })
  password;
}
