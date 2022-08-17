import { Knex } from "knex";
import { USER_INFO_TABLE } from "../../constants/constants";
import {
  USER_INFO_SCHEMA,
  USER_ACCOUNT_SCHEMA,
  USER_ACCOUNT_TABLE,
  SET_NULL,
} from "../../constants/constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USER_INFO_TABLE, (table) => {
    table.increments(USER_INFO_SCHEMA.USER_INFO_ID);
    table.string(USER_INFO_SCHEMA.NAME).notNullable();
    table.string(USER_INFO_SCHEMA.EMAIL).notNullable();
    table.json(USER_INFO_SCHEMA.CONTACTS).notNullable();
    table.string(USER_INFO_SCHEMA.IMAGE);
    table.integer(USER_INFO_SCHEMA.SHARE).defaultTo(0);
    table.integer(USER_INFO_SCHEMA.USER_ACCOUNT_ID).notNullable().unique();
    table
      .foreign(USER_INFO_SCHEMA.USER_ACCOUNT_ID)
      .references(USER_ACCOUNT_SCHEMA.ID)
      .inTable(USER_ACCOUNT_TABLE)
      .onDelete(SET_NULL);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(USER_INFO_TABLE);
}
