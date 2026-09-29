# Design system — Ricardo Amaro Pedreira

Pasta exportada do design system do portfólio. Para usar no projeto do site:

1. Copie esta pasta para dentro do repositório (ex.: `design-system/`).
2. No `<head>` do site carregue, nesta ordem:
   ```html
   <link rel="stylesheet" href="design-system/tokens.css">
   <link rel="stylesheet" href="design-system/components.css">
   ```
3. Use `<html data-theme="dark">` (escuro é o padrão); o toggle troca para `light`.
4. Classes dos componentes começam com `rp-` — veja `components/<Nome>/README.md` e abra `preview.html` para ver cada um.

Arquivos:
- `README.md` — guia da marca (cores, tipografia, voz, layout, animações, estrutura da página).
- `tokens.json` — tokens em formato de dados; `tokens.css` — as mesmas variáveis CSS.
- `components.css` — estilos de Button, Tag, SectionHeading, ProjectCard, NavBar, Hero, Panel.
- `assets/` — avatar do robô (placeholder) e monograma RP.

Prompt sugerido para o Claude na aba Code:
> Leia `design-system/README.md` e `design-system/COMO-USAR.md` e crie o site de portfólio single-page (Hero, Sobre, Projetos, Skills, Contato) usando `tokens.css` e `components.css`, pronto para GitHub Pages.
