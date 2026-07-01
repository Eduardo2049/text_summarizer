import { useState, useRef, useEffect } from 'react';
import { ModeToggle } from './components/ModeToggle';
import { LanguageSelect } from './components/LanguageSelect';
import { ResultCard } from './components/ResultCard';
import { processText } from './api';
import type { Mode } from './types';
import styles from './App.module.css';

const DEBOUNCE_MS = 800;
const MIN_TRANSLATE_CHARS = 3;
const MIN_SUMMARIZE_CHARS = 20;

export default function App() {
  const [mode, setMode] = useState<Mode>('summarize');
  const [language, setLanguage] = useState('pt-BR');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false); // debounce indicator
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const charCount = text.length;
  const isSummarize = mode === 'summarize';

  // ── Real-time translation (debounced) ──
  useEffect(() => {
    if (isSummarize) return; // only for translate mode

    // Clear any pending debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (text.trim().length < MIN_TRANSLATE_CHARS) {
      setResult('');
      setError('');
      setTranslating(false);
      return;
    }

    setTranslating(true);

    debounceRef.current = setTimeout(async () => {
      // Cancel previous in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setLoading(true);
      setError('');
      try {
        const output = await processText(text, 'translate', language, abortRef.current.signal);
        setResult(output);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return; // stale request
        setError(err instanceof Error ? err.message : 'Erro ao conectar ao servidor.');
      } finally {
        setLoading(false);
        setTranslating(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [text, language, isSummarize]);

  // ── Reset result when switching modes or language (summarize) ──
  function handleModeChange(newMode: Mode) {
    abortRef.current?.abort();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setMode(newMode);
    setResult('');
    setError('');
    setTranslating(false);
  }

  function handleClear() {
    abortRef.current?.abort();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setText('');
    setResult('');
    setError('');
    setTranslating(false);
    textareaRef.current?.focus();
  }

  // ── Manual process (summarize only) ──
  async function handleProcess() {
    if (isSummarize && text.trim().length < MIN_SUMMARIZE_CHARS) {
      setError(`O texto precisa ter pelo menos ${MIN_SUMMARIZE_CHARS} caracteres para resumir.`);
      return;
    }
    setLoading(true);
    setResult('');
    setError('');
    try {
      const output = await processText(text, mode, language);
      setResult(output);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Orbs de fundo */}
      <div className={styles.bgOrbs} aria-hidden>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      <main className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <span className={styles.logoText}>
              Texto <span className={styles.logoAi}>IA</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Resumidor e tradutor inteligente — escolha o modo e o idioma
          </p>
        </header>

        {/* Toggle de modo */}
        <ModeToggle mode={mode} onChange={handleModeChange} />

        {/* Card de entrada */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <label htmlFor="inputText" className={styles.cardLabel}>Texto de entrada</label>
            <div className={styles.headerRight}>
              {!isSummarize && translating && (
                <span className={styles.liveIndicator}>
                  <span className={styles.liveDot} />
                  aguardando...
                </span>
              )}
              {!isSummarize && loading && (
                <span className={styles.liveIndicator}>
                  <span className={styles.spinner} style={{ width: 10, height: 10, borderWidth: 1.5 }} />
                  traduzindo...
                </span>
              )}
              <span className={`${styles.charCount} ${charCount > 0 ? styles.charCountActive : ''}`}>
                {charCount.toLocaleString('pt-BR')} caracteres
              </span>
            </div>
          </div>

          <textarea
            id="inputText"
            ref={textareaRef}
            className={styles.textarea}
            placeholder={
              isSummarize
                ? 'Cole ou escreva aqui o texto que deseja resumir...'
                : 'Cole ou escreva aqui o texto que deseja traduzir...'
            }
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck
          />

          <div className={styles.cardControls}>
            <LanguageSelect mode={mode} value={language} onChange={setLanguage} />

            <div className={styles.btnGroup}>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleClear}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Limpar
              </button>

              {/* Summarize: manual button | Translate: auto (button hidden) */}
              {isSummarize && (
                <button
                  className={`${styles.btn} ${styles.btnPrimarySummarize}`}
                  onClick={handleProcess}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="21" y1="6" x2="3" y2="6" /><line x1="15" y1="12" x2="3" y2="12" /><line x1="17" y1="18" x2="3" y2="18" />
                    </svg>
                  )}
                  {loading ? 'Resumindo...' : 'Resumir'}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Erro */}
        {error && (
          <div className={styles.errorCard}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Resultado */}
        {result && <ResultCard result={result} mode={mode} />}
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by{' '}
          <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer">
            OpenRouter
          </a>
        </p>
      </footer>
    </>
  );
}
