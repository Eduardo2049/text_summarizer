import { API_URL } from './types';
import type { Mode, ProcessResult } from './types';

export async function processText(
  text: string,
  mode: Mode,
  language: string,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, mode, language }),
    signal,
  });

  const data = (await response.json()) as ProcessResult & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? 'Erro desconhecido ao processar o texto.');
  }

  return data.result;
}
