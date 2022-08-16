import { StatusCodes } from "http-status-codes";
import logger from "./logger";
import cloudinary from "../utils/cloudinary";
import CustomError from "./CustomError";

/**
 *
 * @param imageData string representation of image to be uploaded in cloudinary
 * @returns url of the image in cloudinary
 */
export const cloudinaryUpload = async (imageData: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(imageData, {
      upload_preset: "contacts",
    });
    logger.info("successfully uploaded image to cloudinary");
    const { url } = uploadResponse;
    logger.info(url);
    return url;
  } catch (error) {
    throw new CustomError(
      "Error Creating a new user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
