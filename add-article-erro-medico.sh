#!/bin/bash

# Adicionar artigo sobre Erro Médico (Direito Médico)
curl -X POST http://localhost:5000/api/articles \
-H "Content-Type: application/json" \
-d @- << 'EOF'
{
  "title": "Erro médico: Responsabilidade civil e direito à indenização",
  "slug": "erro-medico-responsabilidade-indenizacao",
  "excerpt": "Entenda o que caracteriza erro médico no Brasil, quais são seus direitos como paciente, como proceder em caso de negligência médica e quais provas são necessárias para buscar indenização.",
  "content": "# Erro médico: Responsabilidade civil e direito à indenização\n\nO erro médico é uma realidade que pode trazer consequências graves para pacientes e suas famílias. Entender seus direitos e como proceder juridicamente em casos de negligência, imprudência ou imperícia médica é fundamental para garantir a justa reparação. Este artigo explora a caracterização do erro médico, a responsabilidade civil dos profissionais e instituições de saúde, e os caminhos para buscar indenização.\n\n## O que caracteriza o erro médico?\n\nO erro médico é definido como a conduta profissional inadequada que supõe uma inobservância técnica e que causa dano à vida ou à saúde do paciente. Pode ser classificado como:\n\n- **Imprudência**: quando o profissional age com excesso de confiança ou sem cautela necessária\n- **Negligência**: quando há omissão de cuidados ou falta de atenção necessária\n- **Imperícia**: quando há falta de conhecimento técnico ou habilidade para realizar determinado procedimento\n\n<!-- ADSENSE -->\n<div class=\"adsense-container\">\n  <p class=\"adsense-text\">Publicidade</p>\n  <div class=\"adsense-placeholder\">\n    <!-- Código Google AdSense será inserido aqui -->\n  </div>\n</div>\n<!-- FIM ADSENSE -->\n\n## Considerações finais\n\nO erro médico, quando devidamente caracterizado, enseja o direito à reparação. No entanto, é importante compreender que nem todo resultado adverso configura erro médico, e que a medicina não é uma ciência exata.\n\nA busca por justiça em casos de erro médico deve equilibrar o direito do paciente à indenização com o reconhecimento da complexidade da prática médica. Um profissional qualificado pode avaliar adequadamente as chances de sucesso na ação e orientar sobre a melhor estratégia jurídica a ser adotada.\n\nPor fim, além da indenização individual, o debate sobre erros médicos contribui para a melhoria da qualidade dos serviços de saúde, incentivando práticas mais seguras e transparentes e, consequentemente, reduzindo danos futuros a outros pacientes.",
  "imageUrl": "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80",
  "publishDate": {"$date": "2025-01-27T00:00:00.000Z"},
  "categoryId": 3,
  "featured": 0
}
EOF

echo "Artigo sobre Erro Médico adicionado."