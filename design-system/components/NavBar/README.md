# NavBar

Barra de navegação fixa no topo: monograma + nome à esquerda, âncoras das seções (Sobre, Projetos, Skills, Contato) e o toggle de tema (`rp-theme-toggle`, ícone sol/lua) à direita. O link da seção visível recebe `aria-current="true"` (sublinhado teal). No celular (< 640px) os links viram menu; o toggle continua visível. O toggle alterna `data-theme` no `<html>` e grava a escolha em `localStorage`.
