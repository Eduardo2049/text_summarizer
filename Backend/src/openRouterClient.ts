// Desativa verificação de certificado TLS para contornar certificados expirados
// (necessário em ambientes corporativos/proxy ou quando a CA raiz está desatualizada)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function summarizeText(text: string): Promise<string> {
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
          content: `Resuma o texto abaixo em português, em até 5 frases, destacando os pontos principais:\n\n${text}`,
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

  const summary = data.choices?.[0]?.message?.content;

  if (!summary) {
    throw new Error("A API não retornou um resumo em texto.");
  }

  return summary;
}
