# LifeFlow

Dashboard pessoal completo — um "second brain" para organizar tarefas, hábitos, finanças, saúde e conhecimento em um só lugar.

🔗 **[Acessar o site](https://lifeflowsite.netlify.app/)**

## 📋 Sobre o projeto

O LifeFlow reúne em uma única aplicação as áreas que normalmente ficam espalhadas em vários apps diferentes:

- **Planejamento** — projetos, tarefas e metas
- **Conhecimento** — diário, leituras e cursos (second brain)
- **Bem-estar** — hábitos, treinos, corrida e sono
- **Financeiro** — controle de finanças pessoais
- **Sistema** — calendário, arquivos e conquistas
- **Assistente IA** — assistente integrado para resumir a semana, analisar hábitos, montar planos de treino e sugerir prioridades

## 🛠️ Tecnologias

- Node.js no backend
- Banco de dados para persistência dos dados do usuário
- Integração com a API da Anthropic (Claude) para o assistente de IA, chamada a partir do backend — a chave de API nunca fica exposta no navegador
- Deploy do frontend via Netlify

## 🔐 Autenticação

Sistema de contas com login por e-mail e senha.

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd lifeflow

# Instale as dependências
npm install

# Configure a variável API_BASE apontando para o backend
# (veja instruções de deploy do backend)

# Rode o projeto
npm start
```

> Configure a URL da API em `API_BASE` no início do `<script>` do frontend.

## 📤 Exportação de dados

O usuário pode exportar um backup completo em JSON ou apenas as tarefas em CSV.

## 📌 Status

Em desenvolvimento ativo.
