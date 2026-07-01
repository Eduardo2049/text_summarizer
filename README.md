# 📄 Resumidor & Tradutor de Texto com IA

Aplicação web que utiliza inteligência artificial (via [OpenRouter](https://openrouter.ai)) para gerar resumos automáticos e traduções em tempo real para múltiplos idiomas.

---

## 🖥️ Demonstração

Alterne facilmente entre os modos de **Resumir** e **Traduzir**:
- **Resumir:** Cole um texto de pelo menos 20 caracteres e obtenha os pontos principais em até 5 frases no idioma escolhido.
- **Traduzir:** Digite ou cole textos de 3 ou mais caracteres para obter a tradução automática e imediata (tempo real via debounce de 800ms) para o idioma selecionado.

---

## 🗂️ Estrutura do Projeto

```
ProjetoAut/
├── Backend/
│   ├── src/
│   │   ├── server.ts           # Servidor Express + endpoints da API
│   │   └── openRouterClient.ts # Integração e prompts para a API do OpenRouter
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   ├── src/
│   │   ├── components/         # Componentes React (LanguageSelect, ModeToggle, ResultCard)
│   │   ├── App.tsx             # Componente e estado principal
│   │   ├── api.ts              # Serviço de chamadas de API (com AbortController)
│   │   ├── types.ts            # Tipos e constantes compartilhadas
│   │   └── index.css           # Estilos globais e tokens de design
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts          # Configurações do Vite (React + TS)
└── .gitignore
```

---

## ⚙️ Tecnologias

| Camada    | Tecnologia                              |
|-----------|-----------------------------------------|
| Backend   | Node.js, Express, TypeScript            |
| Frontend  | React 19, Vite, TypeScript, CSS Modules |
| IA        | OpenRouter API (modelos de linguagem)   |
| Dev tools | ts-node-dev, dotenv, AbortController    |

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

### 3. Executando o Backend

```bash
cd Backend
npm install
npm run dev
```
O servidor da API rodará em **http://localhost:3001**.

### 4. Executando o Frontend (Vite)

Abra outro terminal:

```bash
cd Frontend
npm install
npm run dev
```
A interface do usuário ficará disponível em **http://localhost:5173**.

---

## 🔌 Endpoints da API

### `GET /health`
Verifica se o servidor está no ar.

**Resposta:**
```json
{ "status": "ok" }
```

---

### `POST /api/process`
Endpoint unificado para resumir ou traduzir textos.

**Body (JSON):**
```json
{
  "text": "O texto que você quer processar...",
  "mode": "summarize", // ou "translate"
  "language": "en"     // código do idioma (ex: pt-BR, en, es, fr, de, it, ja, zh, ar, ru)
}
```

*Nota sobre validações:*
- Modo `summarize`: Requer o mínimo de **20 caracteres**.
- Modo `translate`: Requer o mínimo de **3 caracteres**.

**Resposta de sucesso:**
```json
{
  "result": "Texto processado/traduzido retornado pela IA..."
}
```

---

### `POST /api/summarize` (Legado)
Endpoint legado mantido para compatibilidade simples (resumo em português).

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

---

## 🌐 Variáveis de Ambiente

| Variável             | Descrição                              | Obrigatória |
|----------------------|----------------------------------------|-------------|
| `OPENROUTER_API_KEY` | Chave de acesso à API do OpenRouter    | ✅ Sim      |
| `PORT`               | Porta em que o servidor irá rodar      | Não (padrão: `3001`) |

---

## 📝 Observações

- O arquivo `.env` **não é versionado** por segurança — nunca o envie ao repositório.
- A verificação estrita de TLS foi ajustada temporariamente no Backend com `NODE_TLS_REJECT_UNAUTHORIZED=0` para contornar problemas de certificado expirado/proxy corporativo ao se comunicar com a API do OpenRouter.
- No frontend, requisições de digitação em tempo real concorrentes/obsoletas são canceladas de forma limpa usando `AbortController`.

---

## 📄 Licença

Projeto de uso interno / educacional.
