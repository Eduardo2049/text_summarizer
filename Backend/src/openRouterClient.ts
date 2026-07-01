// Desativa verificação de certificado TLS para contornar certificados expirados
// (necessário em ambientes corporativos/proxy ou quando a CA raiz está desatualizada)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export type Mode = "summarize" | "translate";

const languageNames: Record<string, string> = {
  "pt-BR": "português (Brasil)",
  "en":    "inglês",
  "es":    "espanhol",
  "fr":    "francês",
  "de":    "alemão",
  "it":    "italiano",
  "ja":    "japonês",
  "zh":    "chinês simplificado",
  "ar":    "árabe",
  "ru":    "russo",
};

function buildPrompt(text: string, mode: Mode, language: string): string {
  const langName = languageNames[language] ?? language;

  if (mode === "summarize") {
    return (
      `Resuma o texto abaixo em ${langName}, em até 5 frases, ` +
      `destacando os pontos principais. Responda somente com o resumo:\n\n${text}`
    );
  }

  return (
    `Traduza o texto abaixo para ${langName}. ` +
    `Retorne apenas o texto traduzido, sem explicações adicionais:\n\n${text}`
  );
}

export async function processText(
  text: string,
  mode: Mode,
  language: string
): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: buildPrompt(text, mode, language),
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro na API do OpenRouter: ${error}`);
  }

  const data = await response.json() as {
    choices: { message: { content: string } }[];
  };

  const result = data.choices?.[0]?.message?.content;

  if (!result) {
    throw new Error("A API não retornou um resultado.");
  }

  return result;
}

// Mantém compatibilidade com código legado
export async function summarizeText(text: string): Promise<string> {
  return processText(text, "summarize", "pt-BR");
}
