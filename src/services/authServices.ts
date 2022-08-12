import ISuccess from "../domain/Success";
import { IUserToInsert, IReturnedUser } from "../domain/UserAccount";
import bcrypt from "bcrypt";
import UserAccountModel from "../models/UserAccount";
import { generateToken } from "../utils/common";
import { StatusCodes } from "http-status-codes";
import logger from "../misc/logger";
import CustomError from "../misc/CustomError";

/**
 * @desc makes hash password inserts hashed password and user to database
 * @param user user object which is to be registeres
 * @returns JSON object with message and data
 */
export const createUser = async (
  user: IUserToInsert
): Promise<ISuccess<IReturnedUser>> => {
  logger.info(`Creating user for ${user.email}`);
  const { password } = user;
  // Password Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createdUser = await UserAccountModel.createUser({
    ...user,
    password: hashedPassword,
  });
  return {
    data: createdUser,
    message: "User created Successfully",
  };
};

/**
 * @desc check for user in DB, compares PW using bcryptJs, assigns accesstoken to validated user
 * @param user
 * @returns
 */
export const login = async (user: IUserToInsert): Promise<any> => {
  logger.info(`Logging ${user.email}`);
  const { email, password } = user;
  const existingUser = await UserAccountModel.getUserByEmail(email);
  if (!existingUser)
    throw new CustomError(`Invalid Credential`, StatusCodes.UNAUTHORIZED);
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch)
    throw new CustomError(`Invalid Credential`, StatusCodes.UNAUTHORIZED);
  const accessToken = generateToken(existingUser.id);
  return {
    data: {
      accessToken,
      existingUser,
    },
    message: "User Logged In Successfully",
  };
};
