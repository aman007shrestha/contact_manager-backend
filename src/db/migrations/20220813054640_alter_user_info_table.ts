import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_info", (table) => {
    table.integer("user_account_id").notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_info", (table) => {
    table.integer("user_account_id").notNullable();
  });
}
