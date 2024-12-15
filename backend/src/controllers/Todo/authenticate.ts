import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorHandlerWrapper } from "../../utils";
import { Env } from "../../env";

export const authenticate = (req, res, next: NextFunction) => {
  const { secretKey, expiresIn } = Env;
  console.log(secretKey);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  // const token = req.headers.authorization?.split("")[1]
  // if(!token){
  //     return res.status(401).json({ message: "Token is missing" });
  // }
  const parts = authHeader.split(" ");
  console.log("Authorization Header Parts", parts);
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "invalind auth header" });
  }
  const token = parts[1];
  console.log("token recievd", token);
  console.log("1")
  const secretKey1 = secretKey || "your_secret_key"; 
try {
  const decoded = jwt.verify(token, secretKey1);
  console.log("Decoded Token:", decoded);
} catch (error) {
  console.error("JWT Verification Error:", error);
}

  try {
    const secret = secretKey;
    const decoded = jwt.verify(token, secret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("error getting auth", error);
  }
};
