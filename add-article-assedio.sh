#!/bin/bash

# Adicionar artigo sobre Assédio Moral (Direito Trabalhista)
curl -X POST http://localhost:5000/api/articles \
-H "Content-Type: application/json" \
-d @- << 'EOF'
{
  "title": "Assédio moral no trabalho: Como identificar e quais medidas tomar",
  "slug": "assedio-moral-trabalho-como-identificar",
  "excerpt": "Aprenda a identificar o assédio moral no ambiente de trabalho, conheça seus direitos e saiba quais medidas legais tomar para proteger sua saúde mental e obter reparação.",
  "content": "# Assédio moral no trabalho: Como identificar e quais medidas tomar\n\nO assédio moral no ambiente de trabalho é uma forma de violência psicológica que afeta milhões de trabalhadores brasileiros, causando danos à saúde mental e física das vítimas. Essa prática abusiva, embora muitas vezes sutil e difícil de provar, é considerada uma violação aos direitos fundamentais do trabalhador. Este artigo aborda como identificar o assédio moral, seus impactos, direitos das vítimas e medidas legais disponíveis.\n\n## O que é assédio moral no trabalho?\n\nO assédio moral no trabalho é caracterizado por condutas abusivas e repetitivas (gestos, palavras, comportamentos, atitudes) que atentam contra a dignidade ou integridade psíquica ou física de uma pessoa, ameaçando seu emprego ou degradando o clima de trabalho.\n\n<!-- ADSENSE -->\n<div class=\"adsense-container\">\n  <p class=\"adsense-text\">Publicidade</p>\n  <div class=\"adsense-placeholder\">\n    <!-- Código Google AdSense será inserido aqui -->\n  </div>\n</div>\n<!-- FIM ADSENSE -->\n\n## Considerações finais\n\nO assédio moral no trabalho é uma violação à dignidade humana e traz consequências graves não apenas para as vítimas, mas também para as organizações e a sociedade como um todo. Reconhecer os sinais, documentar as ocorrências e buscar ajuda são passos fundamentais para enfrentar esta situação.\n\nEmbora a comprovação do assédio moral seja frequentemente desafiadora, o sistema jurídico brasileiro tem avançado no reconhecimento deste problema e na proteção das vítimas. Paralelamente às medidas legais, é essencial que as empresas desenvolvam culturas organizacionais que não tolerem comportamentos abusivos e promovam relações de trabalho baseadas no respeito mútuo.\n\nTodo trabalhador tem direito a um ambiente de trabalho digno e saudável, e a luta contra o assédio moral é parte fundamental da promoção da saúde ocupacional e dos direitos humanos no contexto laboral.",
  "imageUrl": "https://images.unsplash.com/photo-1520809227329-2f94844a9635?auto=format&fit=crop&w=800&q=80",
  "publishDate": {"$date": "2025-02-08T00:00:00.000Z"},
  "categoryId": 2,
  "featured": 0
}
EOF

echo "Artigo sobre Assédio Moral adicionado."