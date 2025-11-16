import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  articles, type Article, type InsertArticle, type ArticleWithCategory,
  solutions, type Solution, type InsertSolution
} from "@shared/schema";
import { db } from "./db";
import { eq, like, desc, and, or, sql } from "drizzle-orm";

// Categoria padrão para caso de null
const defaultCategory: Category = {
  id: 0,
  name: "Categoria Desconhecida",
  slug: "desconhecida",
  description: null,
  iconName: null,
  imageUrl: null
};
import { IStorage } from "./storage";

// Helper para mapear resultado de consulta com categoria para ArticleWithCategory
function mapArticleWithCategory(
  article: typeof articles.$inferSelect, 
  category: typeof categories.$inferSelect | null
): ArticleWithCategory {
  return {
    ...article,
    category: category ?? defaultCategory
  };
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Articles
  async getArticles(): Promise<ArticleWithCategory[]> {
    const results = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id));
    
    return results.map(({ article, category }) => ({
      ...article,
      category: category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    }));
  }

  async getArticleBySlug(slug: string): Promise<ArticleWithCategory | undefined> {
    const [result] = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(eq(articles.slug, slug));
    
    if (!result) return undefined;
    
    // Garantir que category nunca seja null
    return {
      ...result.article,
      category: result.category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    };
  }

  async getArticleById(id: number): Promise<ArticleWithCategory | undefined> {
    const [result] = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(eq(articles.id, id));
    
    if (!result) return undefined;
    
    return {
      ...result.article,
      category: result.category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    };
  }

  async getArticlesByCategory(categorySlug: string): Promise<ArticleWithCategory[]> {
    const results = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(eq(categories.slug, categorySlug));
    
    return results.map(({ article, category }) => ({
      ...article,
      category: category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    }));
  }

  async getFeaturedArticles(): Promise<ArticleWithCategory[]> {
    const results = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(eq(articles.featured, 1));
    
    return results.map(({ article, category }) => ({
      ...article,
      category: category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    }));
  }

  async getRecentArticles(limit: number): Promise<ArticleWithCategory[]> {
    const results = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .orderBy(desc(articles.publishDate))
    .limit(limit);
    
    return results.map(({ article, category }) => ({
      ...article,
      category: category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    }));
  }

  async searchArticles(query: string): Promise<ArticleWithCategory[]> {
    const searchPattern = `%${query}%`;
    
    const results = await db.select({
      article: articles,
      category: categories
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(
      or(
        like(articles.title, searchPattern),
        like(articles.excerpt, searchPattern),
        like(articles.content, searchPattern)
      )
    );
    
    return results.map(({ article, category }) => ({
      ...article,
      category: category ?? {
        id: 0,
        name: "Categoria Desconhecida",
        slug: "desconhecida",
        description: null,
        iconName: null,
        imageUrl: null
      }
    }));
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db
      .insert(articles)
      .values(article)
      .returning();
    return newArticle;
  }
  
  async removeArticle(id: number): Promise<boolean> {
    try {
      const result = await db.delete(articles)
        .where(eq(articles.id, id))
        .returning({ id: articles.id });
      
      return result.length > 0;
    } catch (error) {
      console.error(`Erro ao remover artigo ${id}:`, error);
      return false;
    }
  }

  // Solutions
  async getSolutions(): Promise<Solution[]> {
    return await db.select().from(solutions);
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const [newSolution] = await db
      .insert(solutions)
      .values(solution)
      .returning();
    return newSolution;
  }
}