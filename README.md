# 📚 Central de Ajuda CLICKNEX

Sistema de documentação técnica com tema dark minimalista e ícones Lucide.

---

## 🚀 Início Rápido

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/clicknex-help-center.git
cd clicknex-help-center

# Inicie o servidor (escolha uma opção)
python -m http.server 8000
# ou
node server.js

# Acesse no navegador
http://localhost:8000
```

---

## � Estrutura

```
clicknex-help-center/
├── index.html          # Página principal
├── css/style.css       # Estilos
├── js/app.js           # JavaScript
├── pages/              # 40+ páginas de documentação
│   ├── vendas/
│   ├── projetos/
│   ├── atendimento/
│   ├── sistema/
│   └── ...
└── imgs/               # Imagens
```

---

## ✨ Características

- 🎨 Tema dark minimalista
- 🎭 Ícones Lucide SVG
- 📱 Totalmente responsivo
- ⚡ Carregamento dinâmico
- 🔍 Sistema de busca
- 📑 Sumário automático

---

## 🎨 Design

### Cores

- Fundo: `#0a0a0a`
- Texto: `#e8e8e8`
- Destaque: `#1e3a8a`
- Borda: `#2a2a2a`

### Ícones

Todos os ícones são da biblioteca [Lucide](https://lucide.dev) via CDN.

---

## �️ Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Animações)
- JavaScript (Vanilla ES6+)
- Lucide Icons

---

## 📝 Adicionar Nova Página

1. Crie o arquivo em `pages/`
2. Adicione no mapeamento em `js/app.js`
3. Adicione no menu em `index.html`

Exemplo:

```html
<div class="module-header">
    <div class="module-icon">
        <i data-lucide="rocket"></i>
    </div>
    <h1>Título</h1>
    <p class="module-description">Descrição</p>
</div>
```

---

## 📞 Suporte

- Email: suporte@clicknex.com.br
- Portal: https://crm.clicknex.com.br/

---

## 📄 Licença

MIT License

---

**Versão**: 2.1.0  
**Status**: ✅ Ativo
