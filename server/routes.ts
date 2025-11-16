import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertArticleSchema, insertCategorySchema, insertSolutionSchema } from "@shared/schema";
import { contactSchema } from "@shared/contactSchema";
import { sendEmail, checkEmailConfig } from "./email";
import { ZodError } from "zod";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category", error });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating category", error });
    }
  });

  // Articles
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles", error });
    }
  });

  app.get("/api/articles/featured", async (_req, res) => {
    try {
      const articles = await storage.getFeaturedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured articles", error });
    }
  });

  app.get("/api/articles/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 3;
      const articles = await storage.getRecentArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent articles", error });
    }
  });

  app.get("/api/articles/category/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const articles = await storage.getArticlesByCategory(slug);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles by category", error });
    }
  });

  app.get("/api/articles/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const articles = await storage.searchArticles(query);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error searching articles", error });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Error fetching article", error });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid article data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating article", error });
    }
  });

  // Solutions
  app.get("/api/solutions", async (_req, res) => {
    try {
      const solutions = await storage.getSolutions();
      res.json(solutions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching solutions", error });
    }
  });

  app.post("/api/solutions", async (req, res) => {
    try {
      const solutionData = insertSolutionSchema.parse(req.body);
      const solution = await storage.createSolution(solutionData);
      res.status(201).json(solution);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid solution data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating solution", error });
    }
  });

  // Verificar configuração de e-mail na inicialização
  const emailConfigured = checkEmailConfig();
  if (emailConfigured) {
    console.log("Configuração de e-mail validada com sucesso!");
  } else {
    console.warn("Configuração de e-mail incompleta. O envio de e-mails pode não funcionar corretamente.");
  }

  // Rota para download de documentos
  app.get("/api/download/:filename", (req, res) => {
    try {
      const { filename } = req.params;
      
      // Sanitizar o nome do arquivo para evitar ataques de path traversal
      const sanitizedFilename = path.basename(filename);
      
      // Construir o caminho do arquivo
      const filePath = path.join(process.cwd(), 'public', 'docs', sanitizedFilename);
      
      // Verificar se o arquivo existe
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Documento não encontrado" });
      }
      
      // Determinar o tipo MIME com base na extensão
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'application/octet-stream'; // Padrão
      
      if (ext === '.txt') {
        contentType = 'text/plain';
      } else if (ext === '.docx') {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else if (ext === '.pdf') {
        contentType = 'application/pdf';
      }
      
      // Definir cabeçalhos para forçar o download
      res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFilename}"`);
      res.setHeader('Content-Type', contentType);
      
      // Enviar o arquivo
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      console.log(`Download iniciado: ${sanitizedFilename}`);
    } catch (error) {
      console.error("Erro ao processar download:", error);
      res.status(500).json({ message: "Erro ao processar download" });
    }
  });
  
  // Rota para servir o arquivo ads.txt
  app.get("/ads.txt", (_req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(path.join(process.cwd(), 'public', 'ads.txt'));
  });
  
  // Rota para servir o favicon.ico
  app.get("/favicon.ico", (_req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.sendFile(path.join(process.cwd(), 'public', 'favicon.ico'));
  });
  
  // Rota para servir o favicon.svg
  app.get("/favicon.svg", (_req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(process.cwd(), 'public', 'favicon.svg'));
  });
  
  // Rota para servir o favicon.png
  app.get("/favicon.png", (_req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(process.cwd(), 'public', 'favicon.png'));
  });
  
  // Rota temporária para remover o artigo sobre contrato de aluguel
  app.get("/api/admin/remove-aluguel-article", async (_req, res) => {
    try {
      // Buscar todos os artigos
      const articles = await storage.getArticles();
      
      // Encontrar o artigo específico para remover
      const articleToRemove = articles.find(article => 
        article.title === "O que verificar antes de assinar um contrato de aluguel"
      );
      
      if (!articleToRemove) {
        return res.json({ message: "Artigo não encontrado" });
      }
      
      // Remover o artigo do armazenamento (método a ser implementado)
      if (storage.removeArticle && typeof storage.removeArticle === 'function') {
        await storage.removeArticle(articleToRemove.id);
        res.json({ success: true, message: "Artigo removido com sucesso" });
      } else {
        res.status(501).json({ 
          success: false, 
          message: "Função de remoção não implementada" 
        });
      }
    } catch (error) {
      console.error("Erro ao remover artigo:", error);
      res.status(500).json({ 
        success: false, 
        message: "Erro ao processar a remoção do artigo" 
      });
    }
  });

  // Rota para processar o formulário de contato
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      
      console.log("Mensagem de contato recebida:", contactData);
      
      // Criar conteúdo do e-mail
      const subject = `[Desenrola Direito] Contato: ${contactData.subject}`;
      const text = `
Nome: ${contactData.name}
E-mail: ${contactData.email}
${contactData.phone ? `Telefone: ${contactData.phone}` : ''}
Assunto: ${contactData.subject}

Mensagem:
${contactData.message}
      `;
      
      const html = `
<h2>Nova mensagem de contato do site Desenrola Direito</h2>
<p><strong>Nome:</strong> ${contactData.name}</p>
<p><strong>E-mail:</strong> ${contactData.email}</p>
${contactData.phone ? `<p><strong>Telefone:</strong> ${contactData.phone}</p>` : ''}
<p><strong>Assunto:</strong> ${contactData.subject}</p>
<p><strong>Mensagem:</strong></p>
<p>${contactData.message.replace(/\n/g, '<br>')}</p>
      `;
      
      // Enviar e-mail
      const emailResult = await sendEmail(
        'contato@desenroladireito.com.br', 
        subject,
        text,
        html
      );
      
      if (emailResult.success) {
        res.status(200).json({ 
          success: true, 
          message: "Mensagem enviada com sucesso!"
        });
      } else {
        console.error("Erro ao enviar e-mail:", emailResult.error);
        res.status(500).json({ 
          success: false, 
          message: "Falha ao enviar sua mensagem. Por favor, tente novamente mais tarde."
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      }
      console.error("Erro ao processar mensagem de contato:", error);
      res.status(500).json({ 
        success: false, 
        message: "Erro ao processar sua mensagem"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
