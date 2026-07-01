import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { processText, summarizeText, Mode } from "./openRouterClient";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do Frontend
app.use(express.static(path.join(__dirname, "../../Frontend")));

// Endpoint de verificação simples
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Endpoint unificado: resumir ou traduzir
app.post("/api/process", async (req: Request, res: Response) => {
  try {
    const { text, mode, language } = req.body as {
      text?: string;
      mode?: string;
      language?: string;
    };

    if (!mode || !["summarize", "translate"].includes(mode)) {
      return res.status(400).json({
        error: "O campo 'mode' deve ser 'summarize' ou 'translate'.",
      });
    }

    if (!language) {
      return res.status(400).json({
        error: "Informe o idioma de destino no campo 'language'.",
      });
    }

    const minChars = mode === "translate" ? 3 : 20;
    if (!text || text.trim().length < minChars) {
      return res.status(400).json({
        error: `Envie um texto com pelo menos ${minChars} caracteres.`,
      });
    }

    const result = await processText(text, mode as Mode, language);
    return res.json({ result });
  } catch (error) {
    console.error("Erro ao processar texto:", error);
    return res.status(500).json({
      error: "Não foi possível processar o texto. Tente novamente.",
    });
  }
});

// Endpoint legado (compatibilidade)
app.post("/api/summarize", async (req: Request, res: Response) => {
  try {
    const { text } = req.body as { text?: string };

    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        error: "Envie um texto com pelo menos 20 caracteres no campo 'text'.",
      });
    }

    const summary = await summarizeText(text);
    return res.json({ summary });
  } catch (error) {
    console.error("Erro ao resumir texto:", error);
    return res.status(500).json({
      error: "Não foi possível gerar o resumo. Tente novamente.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
