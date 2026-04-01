# Estrutura de Páginas - Central de Ajuda CLICKNEX

## Organização

Esta pasta contém todo o conteúdo modular da Central de Ajuda, organizado para facilitar manutenção e atualizações.

### Estrutura de Pastas

```
pages/
├── central-ajuda.html          # Página inicial
├── conheca.html                # Sobre o CLICKNEX
├── modulos/                    # Módulos do sistema
│   ├── dashboard.html
│   ├── agenda.html
│   ├── vendas.html
│   ├── projetos.html
│   ├── atendimento.html
│   ├── inteligencia.html
│   ├── equipe.html
│   └── sistema.html
└── diretrizes/                 # Políticas e diretrizes
    ├── pre-requisitos.html
    ├── suporte-tecnico.html
    ├── manutencao.html
    ├── api-oficial.html
    ├── privacidade.html
    ├── lid-whatsapp.html
    └── termos-condicoes.html
```

## Como Adicionar Nova Página

1. Crie o arquivo HTML na pasta apropriada
2. Adicione o mapeamento em `js/app.js` no objeto `PAGE_MAP`:
   ```javascript
   'id-da-secao': 'caminho/arquivo.html'
   ```
3. Adicione o link no menu lateral em `index.html`

## Formato dos Arquivos

Cada arquivo deve conter apenas o conteúdo HTML interno (sem `<html>`, `<head>`, `<body>`).

### Exemplo:
```html
<div class="content-text">
    <h1>Título da Página</h1>
    <p>Conteúdo...</p>
</div>
```

## Carregamento Dinâmico

As páginas são carregadas dinamicamente via JavaScript quando o usuário navega. Isso:
- Reduz o tamanho inicial do HTML
- Facilita manutenção (cada página em seu arquivo)
- Melhora organização do código
- Permite cache individual de páginas

## Páginas Estáticas vs Dinâmicas

- **Estáticas**: Permanecem no `index.html` (ex: seções muito simples)
- **Dinâmicas**: Carregadas de arquivos externos (ex: módulos, políticas)
