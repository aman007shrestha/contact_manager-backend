import jwt from "jsonwebtoken";
import { JWT_VALIDITY } from "../constants/constants";

/**
 * @desc Generates token based on payload
 * @param id : number is payload to sign token on
 * @returns string of token
 */
export const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: JWT_VALIDITY,
  });
};
