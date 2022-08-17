import { Knex } from "knex";
import { USER_ACCOUNT_TABLE } from "../../constants/constants";
import { USER_ACCOUNT_SCHEMA } from "../../constants/constants";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USER_ACCOUNT_TABLE, (table) => {
    table.increments(USER_ACCOUNT_SCHEMA.ID);
    table.string(USER_ACCOUNT_SCHEMA.EMAIL).notNullable().unique();
    table.string(USER_ACCOUNT_SCHEMA.PASSWORD).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(USER_ACCOUNT_TABLE);
}
