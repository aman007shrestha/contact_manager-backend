import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_info", (table) => {
    table.increments("user_info_id");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.json("contacts").notNullable();
    table.string("image");
    table.integer("share").defaultTo(0);
    table.integer("user_account_id").notNullable().unique();
    table
      .foreign("user_account_id")
      .references("id")
      .inTable("user_account")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_info");
}
