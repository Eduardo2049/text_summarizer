# 📄 AI-Powered Text Summarizer & Translator

A web application that leverages Artificial Intelligence (via [OpenRouter](https://openrouter.ai)) to generate automatic text summaries and real-time translations across multiple languages.

---

## 🖥️ Features & Demo

Easily switch between **Summarize** and **Translate** modes:
- **Summarize:** Paste text of at least 20 characters and receive key highlights in up to 5 sentences in your selected target language.
- **Translate:** Start typing or paste text of 3 or more characters to get instant, real-time translations (via a 800ms input debounce) into the selected target language.

---

## 🗂️ Project Structure

```
ProjetoAut/
├── Backend/
│   ├── src/
│   │   ├── server.ts           # Express server & API endpoints
│   │   └── openRouterClient.ts # OpenRouter API client wrapper & system prompts
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   ├── src/
│   │   ├── components/         # React UI Components (LanguageSelect, ModeToggle, ResultCard)
│   │   ├── App.tsx             # Main App layout and state management
│   │   ├── api.ts              # API fetch service (includes AbortController integration)
│   │   ├── types.ts            # Type definitions & constant definitions
│   │   └── index.css           # Global CSS variables and design tokens
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts          # Vite configuration (React + TS)
└── .gitignore
```

---

## ⚙️ Technology Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Backend   | Node.js, Express, TypeScript            |
| Frontend  | React 19, Vite, TypeScript, CSS Modules |
| AI        | OpenRouter API (LLMs integration)       |
| Dev tools | ts-node-dev, dotenv, AbortController    |

---

## 🚀 How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- An [OpenRouter API Key](https://openrouter.ai/keys)

### 1. Clone the repository

```bash
git clone https://github.com/Eduardo2049/text_summarizer.git
cd text_summarizer
```

### 2. Configure environment variables

Create a `.env` file in the `Backend` directory:

```env
OPENROUTER_API_KEY=your_key_here
PORT=3001
```

### 3. Run the Backend API

```bash
cd Backend
npm install
npm run dev
```
The API server will start on **http://localhost:3001**.

### 4. Run the Frontend (Vite)

Open a new terminal window:

```bash
cd Frontend
npm install
npm run dev
```
The client user interface will start on **http://localhost:5173**.

---

## 🔌 API Endpoints

### `GET /health`
Checks backend status and availability.

**Response:**
```json
{ "status": "ok" }
```

---

### `POST /api/process`
Unified endpoint to summarize or translate text.

**Request Body (JSON):**
```json
{
  "text": "The text content you want to process...",
  "mode": "summarize", // or "translate"
  "language": "en"     // target language code (e.g., pt-BR, en, es, fr, de, it, ja, zh, ar, ru)
}
```

*Validation Rules:*
- `summarize` mode: Requires a minimum of **20 characters**.
- `translate` mode: Requires a minimum of **3 characters**.

**Success Response (JSON):**
```json
{
  "result": "Processed text or translation returned by the AI..."
}
```

---

### `POST /api/summarize` (Legacy)
Legacy endpoint maintained for backward compatibility (summarizes text into Portuguese).

**Request Body (JSON):**
```json
{
  "text": "The text you want to summarize (minimum 20 characters)..."
}
```

**Success Response (JSON):**
```json
{
  "summary": "Summarized text..."
}
```

---

## 🌐 Environment Variables

| Variable             | Description                            | Required |
|----------------------|----------------------------------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter authorization token    | ✅ Yes   |
| `PORT`               | Port where the Backend API runs        | No (defaults to `3001`) |

---

## 📝 Troubleshooting & Dev Notes

- The `.env` file **must not** be committed or versioned for security reasons.
- To bypass corporate proxies or outdated root authority certificates in development environments, `NODE_TLS_REJECT_UNAUTHORIZED=0` is set in the backend client logic.
- In the frontend client, outdated or concurrent keystroke requests are safely canceled via `AbortController` signals to prevent API race conditions.

---

## 📄 License

Internal / Educational use.
