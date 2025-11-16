import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema remains unchanged
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  iconName: text("icon_name"),
  imageUrl: text("image_url"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Articles
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  publishDate: timestamp("publish_date").notNull(),
  categoryId: integer("category_id").notNull(),
  featured: integer("featured").default(0),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

// Solutions
export const solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  link: text("link").notNull(),
  linkText: text("link_text").notNull(),
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
});

export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type Solution = typeof solutions.$inferSelect;

// Article with category info
export type ArticleWithCategory = Article & {
  category: Category;
};
