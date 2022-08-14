import db from "../db/db";
import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import IContact, { IContactToInsert } from "../domain/Contact";

/**
 * @desc database methods for making database changes. Actual database interaction point.
 */
class ContactTable {
  public static table = "contact";
  // different methods for interacting database

  /**
   *
   * @param userAccountId user_id whose contacts is to be retrieved
   * @returns list of contact object
   */
  public static async getAllContactsForUser(userAccountId: number) {
    let contacts;
    try {
      contacts = await db(ContactTable.table)
        .where({ user_account_id: userAccountId })
        .select();
    } catch (error: any) {
      logger.info(error.message);
    }
    return contacts;
  }

  /**
   *
   * @param contactData The contact data which is to be inserted into database
   * @returns newly created contact object
   */
  public static async createContact(contactData: IContactToInsert) {
    logger.info(`Database query to insert contact`);
    let newContact;
    try {
      newContact = await db(ContactTable.table).insert(contactData, ["*"]);
      return newContact;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param contactData the data which is to be updated, has contact_id for identification of contact object
   * @returns updatedContact
   */
  public static async updateContact(contactData: IContact) {
    logger.info(`Database Update for contact ${contactData.email}`);
    let updatedContact;
    try {
      updatedContact = await db(ContactTable.table)
        .where({ contact_id: contactData.contact_id })
        .update(contactData)
        .returning(["*"]);
      return updatedContact;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param contactId the id of contact object which is to be deleted
   */
  public static async deleteContact(contactId: number): Promise<void> {
    logger.info(`Database Delete for userInfo ${contactId}`);
    try {
      await db(ContactTable.table).where({ contact_id: contactId }).delete();
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param contactId the id of contact object which is to be returned
   * @returns the contact object
   */
  public static async getContactById(contactId: number): Promise<IContact> {
    const userInfo = await db(ContactTable.table)
      .where({ contact_id: contactId })
      .select()
      .first();
    return userInfo;
  }
}
export default ContactTable;
