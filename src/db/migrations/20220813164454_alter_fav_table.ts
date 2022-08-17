import { Knex } from "knex";
import { FAVOURITE_ACCOUNT_TABLE } from "../../constants/constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(FAVOURITE_ACCOUNT_TABLE, (table) => {
    table.unique(["contact_id", "user_account_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {}
