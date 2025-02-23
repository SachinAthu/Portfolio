import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const contactsDBSchema = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 320 }),
  message: text('message'),
});
