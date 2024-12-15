import { Env } from "../env";
import jwt from "jsonwebtoken";

// export const generateToken = (uuid) => {
  //   return `Bearer ${jwt.sign({ uuid }, secretKey || "express", { expiresIn })}`;
  // };
  
  export const generateToken= (userId: String): string =>{
    const { secretKey, expiresIn } = Env; 
  const secretKey1 = secretKey || "secret_key";
  return jwt.sign({userId}, secretKey1, {expiresIn: "6h"})
}

