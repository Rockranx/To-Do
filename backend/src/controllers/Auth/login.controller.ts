import { AppDataSouce } from "../../db";
import { UserEntity } from "../../entities";
import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  // const findUser = await userService.getOneUser({ email });
  // if (!findUser) return null;
  // if (findUser.deletedAt) return null;
  // const compare = await comparePassword(password, findUser.password);
  // if (!compare) return null;
  // const token = generateToken(findUser.id); 
  // res.json({ token }).status(httpStatus.ACCEPTED);


  if(!email || !password){
    return res.status(400).json({message: "Email and Password are required"})
  }

  try {
     const userRepository = AppDataSouce.getRepository(UserEntity);
    const findUser = await userRepository.findOne({ where: { email }})
    if(!findUser){
      return res.status(400).json({message:"User not found"})

    
    } 

    if(findUser.deletedAt){
      return res.status(400).json({message: "This account has been deactivated "})
    }

    const isPassswordValid = await comparePassword(password, findUser.password)
    if(!isPassswordValid){
      return res.status(400).json({message:"Invalid credentials"})
    }

    const token = generateToken(findUser.id)

    return res.status(200).json({token})
  } catch (error) {
    console.error(error)
    return res.status(500).json({meassage: "Internal Server Error"})
  }
};

export const loginController = errorHandlerWrapper(loginHandler);
