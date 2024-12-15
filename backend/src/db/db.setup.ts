import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Env } from "../env";
import { TodoEntity } from "../entities/todo.entity";
import { UserEntity } from "../entities";

export const AppDataSouce = new DataSource({
  type: "mongodb",
  url: `mongodb+srv://${Env.username}:${Env.password}@${Env.host}/`,  
  database: Env.dbName,
  logging: true,
  synchronize: true,
  useUnifiedTopology: true,  
  useNewUrlParser: true,    
  entities: [UserEntity, TodoEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
}); 




