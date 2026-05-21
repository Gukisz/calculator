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
| **Calculadora** | `index.html` | Display com botões numéricos, operadores e teclado |

## ✨ Funcionalidades

### Operaçőes Suportadas
- **Adição** (`+`), **Subtração** (`-`), **Multiplicação** (`*`), **Divisão** (`/`)
- **Números decimais** (`.`)
- **Operadores consecutivos** — permite `+5` ou `-3` após operador (número com sinal)
- **Backspace** — deleta o último caractere digitado
- **Tecla `C`** — limpa toda a expressão

### Entrada por Teclado
| Tecla | Ação |
|-------|------|
| `0-9` | Digita número |
| `.` | Ponto decimal |
| `+`, `-`, `*`, `/` | Operadores |
| `Enter` ou `=` | Avalia expressão |
| `Backspace` ou `Delete` | Remove último caractere |
| `C` | Limpa tudo |

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
- **Design responsivo** — `flex-basis` e `flexbox` para layout adaptável
- **Sem dependências** — apenas JavaScript puro, sem frameworks ou bibliotecas
- **Teclado + Mouse** — suporte a ambos os métodos de entrada
- **Botões sem foco** — `tabindex="-1"` para evitar que botões capturem o foco do teclado

## 🎨 Design System

### Cores

| Contexto | Cor | Descrição |
|----------|-----|-----------|
| Background | `#007566` → `#589A8D` → `#8FC1B5` | Gradiente verde em diagonal |
| Display/ Botões | `rgba(255, 255, 255, 0.75)` | Branco semi-transparente (glass) |
| Operador (`:last-child`) | `#265c4bc9` | Verde escuro semi-transparente |
| Botão ativo | `#ffef78` | Amarelo no clique |
| Texto | `#232323` | Cinza escuro |

### Tipografia

- **Display e botões**: Dosis 400 / 600 / 700 — moderna e legível

### Componentes

| Componente | Características |
|------------|-----------------|
| **Wrapper** | `flex-basis: 400px`, `border-radius: 16px`, glassmorphism com `backdrop-filter` |
| **Display** | `font-size: 40px`, alinhado à direita, overflow oculto com scroll horizontal |
| **Botões** | `border-radius: 16px`, `flex-basis: 20%`, glass effect, hover transparente, clique amarelo |
| **Operadores** | Fundo verde escuro (`#265c4bc9`), texto branco |
| **Botão C** | `flex-basis: 47%` (largura dupla) |
| **Botão 0** | `flex-basis: 73%` (largura tripla) |

## 📁 Estrutura do Projeto

```
/
├── assets/
│   └── favicon.png          # Favicon da calculadora
├── index.html               # Página principal com a calculadora
├── style.css                # Estilos com glassmorphism
├── script.js                # Lógica da calculadora (~190 linhas)
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
