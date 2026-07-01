import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { summarizeText } from "./openRouterClient";

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

// Endpoint principal: recebe um texto e retorna o resumo gerado pela IA
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
