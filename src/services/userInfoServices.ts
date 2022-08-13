import logger from "../misc/logger";
import ISuccess from "../domain/Success";
import IUserInfo, {
  IUserInfoToInsert,
  IDeleteUserInfo,
} from "../domain/UserInfo";
import UserInfoModel from "../models/UserInfo";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";

export const getAllUserInfo = async (): Promise<ISuccess<IUserInfo[]>> => {
  logger.info(`Getting All Users Info`);
  const usersInfo = await UserInfoModel.getAllUserInfo();
  return {
    data: usersInfo,
    message: "Registrations fetched successfully",
  };
};

export const createUserInfo = async (
  userInfo: IUserInfoToInsert
): Promise<ISuccess<IUserInfo>> => {
  logger.info(`Creating user info`);
  logger.info(`Logging from services ${userInfo}`);
  const newUserInfo = await UserInfoModel.createUserInfo(userInfo);
  return {
    data: newUserInfo,
    message: "Info Registered Successfully",
  };
};

export const updateUserInfo = async (
  userInfo: IUserInfo
): Promise<ISuccess<IUserInfo>> => {
  logger.info(`Updating user info for ${userInfo.email}`);
  // Check if the userToBe Updated is requested by the authorized user himself userInfo.
  const existingUserInfo = await UserInfoModel.getUserInfoById(
    userInfo.user_info_id
  );
  if (!existingUserInfo) {
    throw new CustomError(
      `User Info does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingUserInfo.user_account_id !== userInfo.user_account_id) {
    throw new CustomError(
      `You are not authorized to update other's account`,
      StatusCodes.UNAUTHORIZED
    );
  }
  const updatedUserInfo = await UserInfoModel.updateUserInfo(userInfo);
  return {
    data: updatedUserInfo,
    message: "User Info Updated Successfully",
  };
};

export const deleteUserInfo = async (
  userInfo: IDeleteUserInfo
): Promise<ISuccess<IUserInfo>> => {
  logger.info(`Deleting user info for ${userInfo.user_info_id}`);
  // Check if the userToBe Updated is requested by the authorized user himself userInfo.
  const existingUserInfo = await UserInfoModel.getUserInfoById(
    userInfo.user_info_id
  );
  if (!existingUserInfo) {
    throw new CustomError(
      `User Info does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingUserInfo.user_account_id !== userInfo.user_account_id) {
    throw new CustomError(
      `You are not authorized to delete other's account`,
      StatusCodes.UNAUTHORIZED
    );
  }
  await UserInfoModel.deleteUserInfo(userInfo.user_info_id);
  return {
    message: "User Info deleted Successfully",
  };
};
