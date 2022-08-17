// database
export const USER_ACCOUNT_TABLE = "user_account";
export const USER_INFO_TABLE = "user_info";
export const CONTACT_TABLE = "contact";
export const FAVOURITE_ACCOUNT_TABLE = "favourite_account";
export const USER_ACCOUNT_SCHEMA = {
  ID: "id",
  EMAIL: "email",
  PASSWORD: "password",
};
export const USER_INFO_SCHEMA = {
  USER_INFO_ID: "user_info_id",
  NAME: "name",
  EMAIL: "email",
  CONTACTS: "contacts",
  IMAGE: "image",
  SHARE: "share",
  USER_ACCOUNT_ID: "user_account_id",
};
export const SET_NULL = "SET NULL";
// Controllers
export const INPUT_ALL_FIELDS_MESSAGE = "Input All Fields";

// Index
export const TRANSPORT_LIMIT = "50mb";

// UTILS
export const JWT_VALIDITY = "30d";
