import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("todos")
export class TodoEntity {
  @ObjectIdColumn()
  _id: ObjectId; 
  @Column()
  title: String;

  @Column()
  description: String;

  @Column({ default: false })
  completed: boolean;
  @Column()
  userId: String;
}
 