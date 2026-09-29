# Ricardo Amaro Pedreira

Sistema visual do portfólio pessoal de Ricardo Amaro Pedreira, Engenheiro de Software. Minimalista, com muito respiro, **escuro por padrão** — preto profundo com painéis acesos por um contorno teal — e duas cores de energia: **teal** para o que é técnico e confiável, **laranja** para o que pede ação.

## Personalidade

Comunicativo · Resolvedor de problemas · Engenheiro de Software. O sistema precisa transmitir **confiança e solidez** sem parecer frio: técnico, mas acessível.

- **Sólido** — preto puro, tipografia firme (Space Grotesk 700 nos títulos), grade previsível.
- **Claro** — uma ideia por bloco, frases curtas, muito espaço em branco (`space-24` entre seções).
- **Energia pontual** — o laranja aparece pouco e sempre significa “faça algo aqui”.

## Voz e conteúdo

- Primeira pessoa, português do Brasil, frases diretas: “Transformo problemas complexos em software simples de usar.”
- Verbos de resultado: *construí, reduzi, automatizei, integrei*. Números quando existirem (“reduziu o tempo de deploy de 40 para 8 min”).
- Nada de jargão vazio (“sinergia”, “rockstar”). Termos técnicos sim, mas explicados pelo impacto.
- Rótulos de seção em caixa alta curta: SOBRE, PROJETOS, SKILLS, CONTATO.
- CTAs com verbo: “Vamos conversar”, “Ver projeto”, “Baixar currículo”.

## Cores

**O tema escuro é o principal.** O site abre escuro; o claro é a alternativa do toggle. A cena de referência: um painel quase preto (`surface` #121414) sobre fundo preto, com contorno teal de 2px (`border-glow`) e um brilho teal difuso ao redor (`shadow-glow-soft`), como um painel de máquina aceso no escuro. Cards, o bloco de contato e a moldura do avatar seguem esse padrão; no hover o contorno vira `teal` puro e o brilho cresce (`shadow-card`).

| Papel | Token | Claro | Escuro (principal) |
|---|---|---|---|
| Fundo | `bg` | #FFFFFF | #000000 |
| Painel | `surface` | #F5F7F7 | #121414 |
| Contorno aceso | `border-glow` | #9FDDE3 | #0E5A61 |
| Texto | `ink` | #000000 | #FFFFFF |
| Destaque primário | `teal` | #00A1B0 | #00A1B0 |
| Ação / CTA | `orange` | #DF6100 | #DF6100 |

Regras de uso:

- **Texto sobre teal ou laranja é sempre preto** (`on-accent`): 6.7:1 e 5.9:1. Branco sobre essas cores fica abaixo de 4.5:1.
- **Teal como texto pequeno no tema claro usa `teal-ink`** (#007C88, 4.95:1). O `teal` puro sobre branco (3.1:1) só vale para títulos de 24px+, ícones e elementos gráficos.
- Laranja é reservado a: botão de contato/CTA, hover de links, anel de foco (`focus`) e pequenos detalhes de energia (um traço sob o rótulo da seção). Nunca como fundo de área grande.
- Proporção aproximada numa tela: 90% preto/branco/cinzas, 8% teal, 2% laranja.

## Tipografia

- **Space Grotesk** (display) — nome, títulos de seção. Pesos 600–700, tracking levemente negativo.
- **Inter** (texto) — parágrafos, cards, navegação.
- **JetBrains Mono** (código) — tags de tecnologia; reforça o lado engenheiro.

As três vêm do Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

No celular (< 640px) o nome desce de `display-xl` (72px) para `display-lg` (48px) e os títulos de seção de 36px para 28px.

## Layout e espaçamento

- Conteúdo com largura máxima `content-max` (1120px), gutter `space-4` no celular e `space-8` no desktop.
- Seções com `space-24` de padding vertical no desktop, `space-16` no celular.
- Grade de projetos: 1 coluna (< 640px), 2 colunas (≥ 640px), 3 colunas (≥ 1024px), gap `space-6`.
- Cantos levemente arredondados: `radius-md` em botões, `radius-lg` em cards, `radius-sm` em tags.
- Página única com âncoras (`#sobre`, `#projetos`, `#skills`, `#contato`) e `scroll-behavior: smooth`; a navegação compensa a altura do cabeçalho fixo com `scroll-margin-top: 80px`.

## Movimento

Micro-animações discretas, sempre com `prefers-reduced-motion` respeitado (tudo desliga).

- **Revelar no scroll:** opacidade 0 → 1 e `translateY(16px)` → 0, 500ms, `cubic-bezier(.2,.7,.2,1)`, disparado por IntersectionObserver; itens de uma grade entram escalonados em 60ms.
- **Hover de card:** sobe 4px, ganha `shadow-card`, borda vira `teal`; 200ms.
- **Hover de botão:** CTA laranja vai para `orange-hover`; seta interna anda 3px para a direita.
- **Links:** sublinhado teal que cresce da esquerda (`background-size` 0 → 100%).
- **Avatar:** flutuação lenta (±6px, 6s, infinita) e os olhos do robô pulsam de leve.

## Avatar — o robô

O mascote é um robô mecha pesado estilo Jaeger, cartoon 3D: corpo preto fosco, olhos/visor e núcleo do peito em teal brilhante, faixas de aviso em laranja. Ele ocupa o lado direito do hero, dentro de uma moldura `radius-lg` com contorno `border-glow` e halo `shadow-glow` sobre `surface`.

O arquivo `assets/Avatar/robot-avatar.svg` é um **placeholder vetorial** com as mesmas cores e proporções, para usar até a imagem 3D final chegar. Prompt para gerar a versão final (1:1, fundo transparente):

> A 3D cartoon robot mascot, front view, centered, clean studio background. Heavy-duty Jaeger-style mecha vibe — big, bulky, brute and industrial, thick armor plating, powerful shoulders, riveted metal panels. Friendly-but-tough expression, glowing eyes/visor. Matte black body (#000000) with teal (#00A1B0) glowing accents and orange (#DF6100) highlight details. White (#FFFFFF) background. Stylized Pixar/3D-render look, soft studio lighting, subtle teal and orange rim light. --ar 1:1

## Iconografia

Ícones de traço (Lucide ou Feather), 1.75px, 20–24px, na cor do texto ao redor; `teal` quando for decorativo ao lado de um título. Ícones de marca (LinkedIn, GitHub, e-mail) monocromáticos, nunca nas cores originais das marcas. O monograma **RP** (`assets/Logos/rp-monogram.svg`) é o favicon e o logo da navegação.

## Estrutura da página

1. **Hero** — rótulo “Olá, eu sou”, nome em `display-xl`, subtítulo “Engenheiro de Software” em `heading-md`, três palavras-chave separadas por `·` em teal, botões “Ver projetos” (primário teal) e “Vamos conversar” (CTA laranja); avatar à direita (abaixo do texto no celular).
2. **Sobre** — rótulo + título + um parágrafo em `body-lg`, máx. 64ch.
3. **Projetos** — grade de `ProjectCard` (título, descrição, tags de tecnologia, link).
4. **Skills** — grupos de `Tag` (Linguagens, Frameworks, Cloud & DevOps, Ferramentas).
5. **Contato** — frase curta, botão CTA laranja para e-mail e link para o LinkedIn.

Tema claro/escuro: toggle na navegação. **Abre sempre no escuro** (`<html data-theme="dark">`); só muda se a pessoa escolher o claro, e a escolha fica em `localStorage`. As cores trocam via `[data-theme="dark"]` no `<html>`.

## Publicação

O site é estático (HTML + CSS + um pouco de JS), sem build: publicável direto no GitHub Pages a partir da branch `main` (pasta raiz ou `/docs`).
