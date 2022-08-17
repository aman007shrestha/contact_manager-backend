import logger from "../misc/logger";
import ISuccess from "../domain/Success";
import UserInfoModel from "../models/UserInfo";
import CustomError from "../misc/CustomError";
import ContactModel from "../models/Contact";
import { StatusCodes } from "http-status-codes";
import IUserInfo, {
  IUserInfoToInsert,
  IDeleteUserInfo,
  IAddToContact,
} from "../domain/UserInfo";
import { cloudinaryUpload } from "../misc/cloudinaryUtils";
// import IContact from "../domain/Contact";

/**
 * @desc makes db get query for all user_info
 * @returns object with data and message
 */
export const getAllUserInfo = async (): Promise<ISuccess<IUserInfo[]>> => {
  logger.info(`Getting All Users Info`);
  const usersInfo = await UserInfoModel.getAllUserInfo();
  return {
    data: usersInfo,
    message: "Users fetched successfully",
  };
};

/**
 * @desc makes db get query for self user_info
 * @returns object with data and message
 */
export const getSelfInfo = async (
  user_account_id: number
): Promise<ISuccess<IUserInfo>> => {
  logger.info(`Getting User Info`);
  const userInfo = await UserInfoModel.getSelfInfo(user_account_id);
  return {
    data: userInfo,
    message: "Self User fetched successfully",
  };
};

/**
 *
 * @param userInfo : payload which is to be provided for create method in db modek
 * @returns object with data and message
 */
export const createUserInfo = async (
  userInfo: IUserInfoToInsert
): Promise<ISuccess<IUserInfo>> => {
  logger.info(`Logging from services ${userInfo}`);
  if (userInfo.image) {
    userInfo.image = await cloudinaryUpload(userInfo.image);
  }
  const newUserInfo = await UserInfoModel.createUserInfo(userInfo);
  return {
    data: newUserInfo,
    message: "Info Registered Successfully",
  };
};

/**
 *
 * @param userInfo Info with which update method in db model is to be queried
 * @returns Object with updatedUser and message
 */
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
  // Upload to cloudinary only if image is changed

  if (userInfo.image.length > 200) {
    userInfo.image = await cloudinaryUpload(userInfo.image);
  }
  // If no image put previous image
  if (userInfo.image.length < 10) {
    userInfo.image = existingUserInfo.image;
  }

  const updatedUserInfo = await UserInfoModel.updateUserInfo(userInfo);
  return {
    data: updatedUserInfo,
    message: "User Info Updated Successfully",
  };
};

/**
 *
 * @param userInfo : user_info_id and user_account_id, user_account_id to check ownership and user_info_id for delete method in db model
 * @returns Object with message
 */
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

/**
 * @desc performs contact DB query to add user
 * @param userInfo user_account_id and user_info id
 * @returns
 */
export const addToContact = async (userInfo: IAddToContact) => {
  const existingUserInfo = await UserInfoModel.getUserInfoById(
    userInfo.user_info_id
  );
  if (!existingUserInfo) {
    throw new CustomError(
      `User Info does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingUserInfo.share === 0) {
    throw new CustomError(
      `User Info is not accessible`,
      StatusCodes.UNAUTHORIZED
    );
  }
  const newContact = await ContactModel.createContact({
    name: existingUserInfo.name,
    email: existingUserInfo.email,
    contacts: existingUserInfo.contacts,
    image: existingUserInfo.image,
    user_account_id: userInfo.user_account_id,
  });
  return {
    data: newContact,
    message: "Contact Registered Successfully",
  };
};
