import logger from "../misc/logger";
import ISuccess from "../domain/Success";
import IContact, { IContactToInsert, IDeleteContact } from "../domain/Contact";
import ContactModel from "../models/Contact";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";

/**
 *
 * @param userAccountId : user_id for which database getAllContacts query is to be made
 * @returns Object with data and message
 */
export const getAllContactsForUser = async (
  userAccountId: number
): Promise<ISuccess<IContact[]>> => {
  logger.info(`Getting All Contacts for a user with ${userAccountId}`);
  const contacts = await ContactModel.getAllContactsForUser(userAccountId);
  return {
    data: contacts,
    message: "Contacts fetched successfully",
  };
};

/**
 *
 * @param contactData : Data which is to be passed to create method in db model
 * @returns Object with data and message
 */
export const createContact = async (
  contactData: IContactToInsert
): Promise<ISuccess<IContact>> => {
  logger.info(`Creating contact ${contactData.email}`);
  const newContact = await ContactModel.createContact(contactData);
  return {
    data: newContact,
    message: "Contact Registered Successfully",
  };
};

/**
 *
 * @param contactData : Data which is to be passed to update method in db model
 * @returns Object with data and message
 */
export const updateContact = async (
  contactData: IContact
): Promise<ISuccess<IContact>> => {
  logger.info(`Updating user info for ${contactData.email}`);
  // Check if the update contact is invoked by the owner of contact himself
  const existingContact = await ContactModel.getContactById(
    contactData.contact_id
  );
  if (!existingContact) {
    throw new CustomError(
      `Contact does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingContact.user_account_id !== contactData.user_account_id) {
    throw new CustomError(
      `You are not authorized to update other's account`,
      StatusCodes.UNAUTHORIZED
    );
  }
  const updatedContact = await ContactModel.updateContact(contactData);
  return {
    data: updatedContact,
    message: "Contact Updated Successfully",
  };
};

/**
 *
 * @param contactData : contact_id and user_id, user_id to check ownership, contact_id to make delete method in db model
 * @returns Object with message
 */
export const deleteContact = async (
  contactData: IDeleteContact
): Promise<ISuccess<IContact>> => {
  logger.info(`Deleting contact ${contactData.contact_id}`);
  // // Check if the delete contact is invoked by the owner of contact himself
  const existingContact = await ContactModel.getContactById(
    contactData.contact_id
  );
  if (!existingContact) {
    throw new CustomError(
      `Contact does not exist for that id`,
      StatusCodes.BAD_REQUEST
    );
  }
  if (existingContact.user_account_id !== contactData.user_account_id) {
    throw new CustomError(
      `You are not authorized to delete other's account`,
      StatusCodes.UNAUTHORIZED
    );
  }
  await ContactModel.deleteContact(contactData.contact_id);
  return {
    message: "Contact deleted Successfully",
  };
};
