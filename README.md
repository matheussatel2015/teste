# Saíso Korean Food Market Landing Page

Landing page premium, bilíngue (PT-BR/한국어), construída com Next.js + Tailwind CSS.

## Publicação no GitHub Pages

Este projeto já está configurado para deploy automático no **GitHub Pages**.

### 1) Pré-requisitos
- Repositório no GitHub com branch `main` (ou `master`).
- GitHub Pages habilitado em **Settings → Pages → Source: GitHub Actions**.

### 2) Como publicar
1. Faça push deste código para `main` (ou `master`).
2. O workflow `.github/workflows/deploy-pages.yml` será executado.
3. A action gera o build estático (`out/`) e publica automaticamente no Pages.

### 3) Observações técnicas
- `next.config.mjs` usa `output: 'export'` para gerar site estático.
- Em ambiente GitHub Actions, o `basePath` é ajustado automaticamente para repositórios do tipo `usuario/repositorio`.
- Para repositórios `usuario.github.io`, o site é publicado na raiz.
