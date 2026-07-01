import { LANGUAGES } from '../types';
import type { Language, Mode } from '../types';
import styles from './LanguageSelect.module.css';

interface Props {
  mode: Mode;
  value: string;
  onChange: (lang: string) => void;
}

export function LanguageSelect({ mode, value, onChange }: Props) {
  const label = mode === 'summarize' ? 'Idioma do resumo:' : 'Traduzir para:';

  return (
    <div className={styles.group}>
      <span className={styles.label}>{label}</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Idioma de destino"
      >
        {LANGUAGES.map((lang: Language) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
