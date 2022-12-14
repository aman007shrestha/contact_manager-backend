import { Knex } from "knex";
import { CONTACT_TABLE } from "../../constants/constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(CONTACT_TABLE, (table) => {
    table.increments("contact_id");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.json("contacts").notNullable();
    table.string("image");
    table.integer("user_account_id").notNullable();
    table
      .foreign("user_account_id")
      .references("id")
      .inTable("user_account")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(CONTACT_TABLE);
}
