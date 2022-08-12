import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("favourite_account", (table) => {
    table.increments("fav_id");
    table.integer("contact_id").notNullable();
    table.integer("user_account_id").notNullable();
    table
      .foreign("contact_id")
      .references("contact_id")
      .inTable("contact")
      .onDelete("SET NULL");
    table
      .foreign("user_account_id")
      .references("id")
      .inTable("user_account")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("favorite_account");
}
