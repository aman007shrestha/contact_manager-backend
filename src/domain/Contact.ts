export default interface IContact {
  contact_id: number;
  name: string;
  email: string;
  contacts: object;
  image: string;
  user_account_id: number;
}
export interface IDeleteContact {
  contact_id: number;
  user_account_id: number;
}
export type IContactToInsert = Omit<IContact, "contact_id">;
