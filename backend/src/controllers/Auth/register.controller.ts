import { AppDataSouce } from "../../db";
import { UserEntity } from "../../entities";
import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await encryptPassword(password);
  // const user = await userService.createUser({
  //   username,
  //   email,
  //   password: hashPassword,
  // });
  // res.json({ user }).status(httpStatus.CREATED);
  try {
    const userRepository = AppDataSouce.getRepository(UserEntity);

    const existingUser = await userRepository.findOneBy({email});
    if(existingUser){ 
      return res.status(400).json({message: "User already exist"})
    }

    const newUser = userRepository.create({ username, email, password: hashPassword });
    const savedUser = await userRepository.save(newUser)

    return res.status(200).json({user: savedUser})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
};

export const registerController = errorHandlerWrapper(registerHandler);
