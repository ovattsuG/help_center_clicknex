# 📚 Central de Ajuda CLICKNEX

> Sistema de documentação técnica e tutoriais com tema dark minimalista

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

---

## 🎯 Sobre o Projeto

Central de Ajuda do CLICKNEX - Documentação técnica completa com foco em legibilidade e experiência do usuário.

### ✨ Características

- 🎨 **Tema Dark Minimalista** - Design limpo e profissional
- 📱 **Totalmente Responsivo** - Funciona em todos os dispositivos
- ⚡ **Carregamento Dinâmico** - Páginas carregadas sob demanda
- 📑 **Sumário Automático** - Navegação inteligente por tópicos
- 🔍 **Sistema de Busca** - Encontre conteúdo rapidamente
- 👍 **Sistema de Feedback** - Melhoria contínua

---

## 🚀 Início Rápido

### Pré-requisitos

Você precisa de um servidor HTTP local. Escolha uma opção:

- Python 3.x
- Node.js
- PHP
- VS Code com Live Server

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/clicknex-help-center.git
cd clicknex-help-center
```

2. **Inicie o servidor**

**Opção 1: Python (Recomendado)**
```bash
python -m http.server 8000
```

**Opção 2: Node.js**
```bash
node server.js
```

**Opção 3: Windows (Auto-detecta)**
```bash
# Duplo clique em:
iniciar-servidor.bat
```

3. **Acesse no navegador**
```
http://localhost:8000
```

---

## 📁 Estrutura do Projeto

```
clicknex-help-center/
├── index.html              # Página principal (339 linhas)
├── css/
│   └── style.css          # Tema dark minimalista
├── js/
│   └── app.js             # Carregamento dinâmico
├── pages/                 # 21 páginas externas
│   ├── modulos/          # 8 tutoriais de módulos
│   ├── diretrizes/       # 7 políticas e diretrizes
│   └── api/              # 2 documentações de API
└── imgs/                  # Imagens e screenshots
```

---

## 📖 Documentação

### Documentos Principais

- 📚 **[DOCUMENTACAO-COMPLETA.md](DOCUMENTACAO-COMPLETA.md)** - Documento mestre com tudo
- 🎨 **[GUIA-TEMA-MINIMALISTA.md](GUIA-TEMA-MINIMALISTA.md)** - Guia do tema e cores
- 📑 **[SUMARIO-AUTOMATICO.md](SUMARIO-AUTOMATICO.md)** - Como funciona o sumário
- 📝 **[CHANGELOG-MINIMALISTA.md](CHANGELOG-MINIMALISTA.md)** - Histórico de mudanças
- 🧪 **[COMO-TESTAR.md](COMO-TESTAR.md)** - Guia de testes

### Leitura Recomendada

1. Comece com `DOCUMENTACAO-COMPLETA.md` para visão geral
2. Leia `GUIA-TEMA-MINIMALISTA.md` para entender o design
3. Consulte `COMO-TESTAR.md` para rodar localmente

---

## 🎨 Tema Dark Minimalista

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Fundo Principal | `#0a0a0a` | Background |
| Texto Principal | `#e8e8e8` | Títulos e texto |
| Destaque | `#1e3a8a` | Links e botões |
| Borda | `#2a2a2a` | Separadores |

### Princípios

- ✅ Minimalismo - Apenas o essencial
- ✅ Legibilidade - Contraste WCAG AAA (14.5:1)
- ✅ Consistência - 8 cores, 5 espaçamentos
- ✅ Responsividade - Mobile First

---

## 🛠️ Tecnologias

- **HTML5** - Semântico e acessível
- **CSS3** - Flexbox, Grid, Variáveis
- **JavaScript** - Vanilla ES6+
- **Fetch API** - Carregamento dinâmico

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| Páginas HTML | 21 |
| Linhas index.html | 339 (↓84%) |
| Linhas CSS | ~600 |
| Linhas JavaScript | ~700 |
| Tempo de carregamento | <1s |
| Contraste WCAG | AAA |

---

## 🔧 Desenvolvimento

### Adicionar Nova Página

1. **Criar arquivo**
```bash
pages/modulos/nova-pagina.html
```

2. **Estrutura básica**
```html
<div class="module-header">
    <div class="module-icon">🎯</div>
    <h1>Título</h1>
    <p class="module-description">Descrição</p>
</div>

<div class="content-text">
    <h2>Tópico 1</h2>
    <p>Conteúdo...</p>
</div>
```

3. **Adicionar no mapeamento** (`js/app.js`)
```javascript
const PAGE_MAP = {
    'nova-pagina': 'modulos/nova-pagina.html',
}
```

4. **Adicionar no menu** (`index.html`)
```html
<a href="#nova-pagina" data-section="nova-pagina">
    Nova Página
</a>
```

### Customizar Cores

Edite as variáveis em `css/style.css`:

```css
:root {
    --color-accent: #1e3a8a;  /* Sua cor */
}
```

---

## 📱 Responsividade

### Breakpoints

- **Desktop** (> 1200px) - Layout 3 colunas
- **Tablet** (768px - 1200px) - Layout 2 colunas
- **Mobile** (< 768px) - Layout 1 coluna

### Testes

Testado em:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS/Android)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

- **Desenvolvimento** - Equipe CLICKNEX
- **Design** - Equipe CLICKNEX
- **Conteúdo** - Equipe CLICKNEX

---

## 📞 Suporte

- 📧 Email: suporte@clicknex.com.br
- 🌐 Portal: https://crm.clicknex.com.br/
- 📚 Docs: [DOCUMENTACAO-COMPLETA.md](DOCUMENTACAO-COMPLETA.md)

---

## 🎯 Roadmap

### v2.1.0 (Próxima)
- [ ] Modo claro (opcional)
- [ ] Busca avançada
- [ ] Breadcrumbs
- [ ] Animações melhoradas

### v3.0.0 (Futuro)
- [ ] Sistema de comentários
- [ ] Versionamento de docs
- [ ] Exportar para PDF
- [ ] Tradução multi-idioma

---

## ⭐ Agradecimentos

Obrigado por usar a Central de Ajuda CLICKNEX!

Se este projeto foi útil, considere dar uma ⭐

---

**Versão**: 2.0.0  
**Última atualização**: 02/02/2026  
**Status**: ✅ Ativo
