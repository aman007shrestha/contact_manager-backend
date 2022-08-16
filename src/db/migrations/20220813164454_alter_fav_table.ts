import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("favourite_account", (table) => {
    table.unique(["contact_id", "user_account_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {}
