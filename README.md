# 📄 Resumidor de Texto com IA

Aplicação web que utiliza inteligência artificial (via [OpenRouter](https://openrouter.ai)) para gerar resumos automáticos de textos em português.

---

## 🖥️ Demonstração

Cole qualquer texto no campo de entrada e receba um resumo com os principais pontos em até 5 frases, gerado por um modelo de linguagem via API do OpenRouter.

---

## 🗂️ Estrutura do Projeto

```
ProjetoAut/
├── Backend/
│   ├── src/
│   │   ├── server.ts           # Servidor Express + endpoints da API
│   │   └── openRouterClient.ts # Integração com a API do OpenRouter
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   └── index.html              # Interface web (HTML + CSS + JS em um único arquivo)
└── .gitignore
```

---

## ⚙️ Tecnologias

| Camada    | Tecnologia                              |
|-----------|-----------------------------------------|
| Backend   | Node.js, Express, TypeScript            |
| Frontend  | HTML5, CSS3, JavaScript (vanilla)       |
| IA        | OpenRouter API (modelos de linguagem)   |
| Dev tools | ts-node-dev, dotenv                     |

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Chave de API do [OpenRouter](https://openrouter.ai/keys)

### 1. Clone o repositório

```bash
git clone https://github.com/Eduardo2049/text_summarizer.git
cd text_summarizer
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `Backend/.env`:

```env
OPENROUTER_API_KEY=sua_chave_aqui
PORT=3001
```

### 3. Instale as dependências do Backend

```bash
cd Backend
npm install
```

### 4. Inicie o servidor

```bash
npm run dev
```

O servidor ficará disponível em **http://localhost:3001**.  
O Frontend é servido automaticamente pelo próprio Express — basta acessar a URL acima no navegador.

---

## 🔌 Endpoints da API

### `GET /health`
Verifica se o servidor está no ar.

**Resposta:**
```json
{ "status": "ok" }
```

---

### `POST /api/summarize`
Recebe um texto e retorna o resumo gerado pela IA.

**Body (JSON):**
```json
{
  "text": "Texto que deseja resumir (mínimo 20 caracteres)..."
}
```

**Resposta de sucesso:**
```json
{
  "summary": "Resumo gerado pela IA..."
}
```

**Resposta de erro:**
```json
{
  "error": "Mensagem de erro"
}
```

---

## 🌐 Variáveis de Ambiente

| Variável             | Descrição                              | Obrigatória |
|----------------------|----------------------------------------|-------------|
| `OPENROUTER_API_KEY` | Chave de acesso à API do OpenRouter    | ✅ Sim      |
| `PORT`               | Porta em que o servidor irá rodar      | Não (padrão: `3001`) |

---

## 📝 Observações

- O arquivo `.env` **não é versionado** por segurança — nunca o envie ao repositório.
- Em ambientes com proxy corporativo ou certificados TLS expirados, a variável `NODE_TLS_REJECT_UNAUTHORIZED=0` é definida automaticamente no cliente para permitir a conexão com a API.

---

## 📄 Licença

Projeto de uso interno / educacional.
