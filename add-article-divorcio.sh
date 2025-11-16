#!/bin/bash

# Adicionar artigo sobre Divórcio (Direito de Família)
curl -X POST http://localhost:5000/api/articles \
-H "Content-Type: application/json" \
-d @- << 'EOF'
{
  "title": "Divórcio no Brasil: Processos, custos e impactos jurídicos",
  "slug": "divorcio-processos-custos-impactos",
  "excerpt": "Um guia completo sobre o processo de divórcio no Brasil, incluindo tipos de divórcio, procedimentos, custos, divisão de bens e os impactos jurídicos na vida familiar.",
  "content": "# Divórcio no Brasil: Processos, custos e impactos jurídicos\n\nO divórcio é o processo legal que dissolve oficialmente o vínculo matrimonial, permitindo que os ex-cônjuges sigam caminhos separados, inclusive com a possibilidade de novos casamentos. No Brasil, desde a Emenda Constitucional nº 66/2010, o processo de divórcio foi significativamente simplificado, eliminando a exigência de separação judicial prévia. Este artigo apresenta informações completas sobre os tipos de divórcio, procedimentos, custos e impactos jurídicos para quem enfrenta esta situação.\n\n## Tipos de divórcio no Brasil\n\n### 1. Divórcio Consensual\n\nO divórcio consensual ocorre quando ambos os cônjuges concordam com o término do casamento e com todas as questões relacionadas, como:\n\n- Partilha de bens\n- Guarda dos filhos\n- Regime de visitas\n- Pensão alimentícia\n- Uso do nome de casado\n\n<!-- ADSENSE -->\n<div class=\"adsense-container\">\n  <p class=\"adsense-text\">Publicidade</p>\n  <div class=\"adsense-placeholder\">\n    <!-- Código Google AdSense será inserido aqui -->\n  </div>\n</div>\n<!-- FIM ADSENSE -->\n\n## Considerações finais\n\nO divórcio, embora represente o fim do vínculo matrimonial, não encerra as responsabilidades parentais quando há filhos envolvidos. A forma como o processo é conduzido pode ter impacto significativo na saúde emocional de todos os envolvidos, especialmente dos filhos.\n\nA escolha da modalidade de divórcio mais adequada deve considerar não apenas aspectos financeiros, mas também emocionais e práticos. Quando possível, optar por soluções consensuais costuma trazer benefícios a longo prazo para toda a família.\n\nA assistência jurídica adequada é fundamental para garantir que direitos sejam preservados e que o processo ocorra da forma mais tranquila possível, permitindo que todos os envolvidos possam seguir adiante com suas vidas após esta importante transição.",
  "imageUrl": "https://images.unsplash.com/photo-1585908286456-991b5d0e52cc?auto=format&fit=crop&w=800&q=80",
  "publishDate": {"$date": "2025-03-15T00:00:00.000Z"},
  "categoryId": 5,
  "featured": 0
}
EOF

echo "Artigo sobre Divórcio adicionado."