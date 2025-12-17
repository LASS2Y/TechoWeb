import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});
