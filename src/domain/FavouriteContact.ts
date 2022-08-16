export interface IFavouriteContact {
  fav_id: number;
  contact_id: number;
  user_account_id: number;
}
export type IFavouriteContactToInsert = Omit<IFavouriteContact, "fav_id">;
