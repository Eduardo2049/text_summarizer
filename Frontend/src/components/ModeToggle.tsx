import type { Mode } from '../types';
import styles from './ModeToggle.module.css';

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onChange }: Props) {
  return (
    <div className={styles.toggle} role="group" aria-label="Modo de operação">
      <button
        className={`${styles.btn} ${mode === 'summarize' ? styles.activeSummarize : ''}`}
        onClick={() => onChange('summarize')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="21" y1="6" x2="3" y2="6" />
          <line x1="15" y1="12" x2="3" y2="12" />
          <line x1="17" y1="18" x2="3" y2="18" />
        </svg>
        Resumir
      </button>
      <button
        className={`${styles.btn} ${mode === 'translate' ? styles.activeTranslate : ''}`}
        onClick={() => onChange('translate')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        Traduzir
      </button>
    </div>
  );
}
