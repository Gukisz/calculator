<div align="center">
  <h1>Calculator</h1>
  <p><strong>Calculadora Web com Notação Pós-Fixa</strong></p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/license-BSD--3--Clause-blue?style=for-the-badge" alt="BSD 3-Clause">
  </p>
</div>

---

## Sobre

Calculadora web desenvolvida com HTML5, CSS3 e JavaScript puros como projeto de estudo. Suporta entrada por mouse e teclado, utilizando o algoritmo **Shunting-yard** para converter expressões infixas para **notação pós-fixa (PostFix)** e resolvê-las com uma pilha.

## 📄 Páginas

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| **Calculadora** | `index.html` | Display com botões numéricos, operadores, histórico e teclado |

## ✨ Funcionalidades

### Operaçőes Suportadas
- **Adição** (`+`), **Subtração** (`-`), **Multiplicação** (`*`), **Divisão** (`/`), **Módulo** (`%`)
- **Números decimais** (`.`)
- **Inversão de sinal** (`+/−`) — alterna entre positivo e negativo
- **Raiz quadrada** (`√`) — aplicada ao número atual no display
- **Operadores consecutivos** — permite `+5` ou `-3` após operador (número com sinal)
- **Backspace** — deleta o último caractere digitado
- **Tecla `C`** — limpa toda a expressão

### Histórico de Operações
- Painel lateral com todas as expressões e resultados anteriores
- Acesso pelo botão de relógio na toolbar
- Ordenado do mais recente para o mais antigo

### Temas
- **Modo escuro** — toggle na toolbar para alternar entre claro e escuro
- **Paletas de cor** — 5 opções de gradiente de fundo: Verde, Azul, Roxo, Laranja e Rosa

### Entrada por Teclado
| Tecla | Ação |
|-------|------|
| `0-9` | Digita número |
| `.` | Ponto decimal |
| `+`, `-`, `*`, `/`, `%` | Operadores |
| `Enter` ou `=` | Avalia expressão |
| `Backspace` ou `Delete` | Remove último caractere |
| `C` | Limpa tudo |

### Feedback Visual
- Botão pressionado ganha destaque amarelo com `transform: scale(0.95)` por 150ms
- Ao usar o teclado, o botão correspondente na tela recebe o mesmo feedback visual

### Sistema de Input
- **`inputArray`** — array interno que armazena o tipo de cada entrada (número, operador, número com sinal, etc.)
- Validação de expressões — impede operandos inválidos e operadores consecutivos ilegais
- Controle de ponto decimal — apenas um por número (`curExprIsFrac`)

### Sistema de Execução
1. A expressão no display é convertida para **notação pós-fixa** usando o algoritmo Shunting-yard com precedência de operadores (`+`/`-` = 1, `*`/`/`/`%` = 2)
2. A expressão pós-fixa é resolvida com uma pilha — operandos são empilhados, operadores desempilham e aplicam a operação
3. Resultados decimais são exibidos com 2 casas decimais (`toFixed(2)`)

### Destaques Técnicos
- **Glassmorphism** — design com `backdrop-filter: blur()`, fundo semi-transparente e bordas suaves
- **Tema dinâmico** — CSS custom properties alternadas via classe no `<body>`
- **Design responsivo** — 3 breakpoints (480px, 360px) para mobile
- **Sem dependências** — apenas JavaScript puro, sem frameworks ou bibliotecas
- **Teclado + Mouse** — suporte a ambos os métodos de entrada com feedback visual nos botões
- **Botões sem foco** — `tabindex="-1"` para evitar que botões capturem o foco do teclado
- **SVG inline** — ícones na toolbar sem dependências externas

## 🎨 Design System

### Cores (Tema Claro)

| Contexto | Cor | Descrição |
|----------|-----|-----------|
| Background | `#007566` → `#589A8D` → `#8FC1B5` | Gradiente verde em diagonal |
| Display / Botões | `rgba(255, 255, 255, 0.75)` | Branco semi-transparente (glass) |
| Operador (`:last-child`) | `#265c4bc9` | Verde escuro semi-transparente |
| Botão ativo | `#ffef78` | Amarelo no clique / keypress |
| Texto | `#232323` | Cinza escuro |

### Cores (Tema Escuro)

| Contexto | Cor | Descrição |
|----------|-----|-----------|
| Background | `#1a1a2e` → `#16213e` → `#0f3460` | Gradiente azul escuro |
| Display / Botões | `rgba(30, 30, 50, 0.8)` | Azul escuro semi-transparente |
| Operador | `#0f3460c9` | Azul marinho |
| Botão ativo | `#e94560` | Vermelho no clique / keypress |
| Texto | `#e0e0e0` | Cinza claro |

### Paletas de Fundo

| Paleta | Cores do Gradiente |
|--------|-------------------|
| Verde (padrão) | `#007566` → `#589A8D` → `#8FC1B5` |
| Azul | `#1e3c72` → `#2a5298` → `#4a7bc4` |
| Roxo | `#4a0e4e` → `#7b2d8b` → `#b06ab3` |
| Laranja | `#cc5500` → `#e07c3c` → `#f0a070` |
| Rosa | `#7a2040` → `#b84a6a` → `#d4809a` |

### Tipografia

- **Display e botões**: Dosis 400 / 600 / 700 — moderna e legível

### Componentes

| Componente | Características |
|------------|-----------------|
| **Toolbar** | `max-width: 420px`, flex entre tool buttons e paletas, `backdrop-filter` |
| **Wrapper** | `max-width: 420px`, `border-radius: 16px`, glassmorphism |
| **Display** | `font-size: 2rem`, alinhado à direita, scroll horizontal oculto, `min-height: 80px` |
| **Histórico** | Sobreposição no display, fundo `--history-bg`, scroll interno, expressão + resultado |
| **Botões** | `border-radius: 16px`, `flex: 1`, glass effect, hover transparente, active/pressed amarelo |
| **Operadores** | Fundo `--operator-bg`, texto `--operator-text` (verde claro / azul escuro) |
| **Botões de paleta** | Círculos de 20px com `border-radius: 50%`, hover scale 1.2 |

## 📁 Estrutura do Projeto

```
/
├── assets/
│   └── favicon.png          # Favicon da calculadora
├── index.html               # Página principal com a calculadora
├── style.css                # Estilos com glassmorphism, temas e responsividade
├── script.js                # Lógica da calculadora (~230 linhas)
├── README.md                # Documentação
└── LICENSE                  # Licença BSD 3-Clause
```

## 🚀 Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Gukisz/calculator.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd calculator
   ```

3. Abra o arquivo `index.html` no seu navegador:
   ```bash
   open index.html   # macOS
   xdg-open index.html  # Linux
   start index.html  # Windows
   ```

Não é necessário instalar dependências ou configurar servidor — o site é 100% estático com HTML, CSS e JavaScript puros.

## 📄 Licença

Distribuído sob licença BSD 3-Clause. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

<div align="center">
  <p>Desenvolvido como projeto de estudo</p>
</div>
