import { Knex } from "knex";
import { FAVOURITE_ACCOUNT_TABLE } from "../../constants/constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(FAVOURITE_ACCOUNT_TABLE, (table) => {
    table.increments("fav_id");
    table.integer("contact_id").notNullable();
    table.integer("user_account_id").notNullable();
    table
      .foreign("contact_id")
      .references("contact_id")
      .inTable("contact")
      .onDelete("CASCADE");
    table
      .foreign("user_account_id")
      .references("id")
      .inTable("user_account")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(FAVOURITE_ACCOUNT_TABLE);
}
