import { createDatabase } from "typeorm-extension";
import { Env } from "../env";

import { AppDataSouce } from "./db.setup";
import { encryptPassword } from "../utils";
import { UserEntity } from "../entities";

export const dbCreate = async () => {
  // await createDatabase({
  //   ifNotExist: true,
  //   options: {
  //     type: "mysql",
  //     host: Env.host,
  //     username: Env.username,
  //     password: Env.password,
  //     port: Env.dbPort,
  //     database: Env.dbName,
  //     entities: [UserEntity],
  //   },
  // });
  try {
    const userRepository = AppDataSouce.getRepository(UserEntity);  // Get the repository for UserEntity
    // Check if a user with a specific email exists
    const existingUser = await userRepository.findOneBy({ email: "ranxdevrock@gmail.com" });


    if (!existingUser) {
      // If no user exists, create and save a new one
      const newUser = userRepository.create({
        username: "newguys",
        email: "newguy@gmail.com",
        password: await encryptPassword("newguy"),
         
      });

      // Save thenew user in MongoDB
      await userRepository.save(newUser);
      console.log("User has been created, db is up");
    } else {
      console.log("db has data");
    }
  } catch (error) {
    console.error("Error during DB setup:", error );
    throw error;
  }
};
