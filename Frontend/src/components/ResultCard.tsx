import { useState } from 'react';
import styles from './ResultCard.module.css';
import type { Mode } from '../types';

interface Props {
  result: string;
  mode: Mode;
}

export function ResultCard({ result, mode }: Props) {
  const [copied, setCopied] = useState(false);
  const isSummarize = mode === 'summarize';

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}>
        <div className={styles.line} />
        <span className={styles.dividerText}>
          {isSummarize ? 'Resumo Gerado' : 'Tradução Gerada'}
        </span>
        <div className={styles.line} />
      </div>

      <div className={`${styles.card} ${isSummarize ? styles.cardSummarize : styles.cardTranslate}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.badge} ${isSummarize ? styles.badgeSummarize : styles.badgeTranslate}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {isSummarize ? 'Resumo' : 'Tradução'}
          </div>

          <button className={styles.copyBtn} onClick={handleCopy} title="Copiar resultado">
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        <p className={styles.text}>{result}</p>
      </div>
    </div>
  );
}
