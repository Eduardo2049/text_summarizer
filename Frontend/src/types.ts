export type Mode = 'summarize' | 'translate';

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface ProcessResult {
  result: string;
}

export interface ApiError {
  error: string;
}

export const LANGUAGES: Language[] = [
  { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en',    label: 'English',             flag: '🇺🇸' },
  { code: 'es',    label: 'Español',             flag: '🇪🇸' },
  { code: 'fr',    label: 'Français',            flag: '🇫🇷' },
  { code: 'de',    label: 'Deutsch',             flag: '🇩🇪' },
  { code: 'it',    label: 'Italiano',            flag: '🇮🇹' },
  { code: 'ja',    label: '日本語',              flag: '🇯🇵' },
  { code: 'zh',    label: '中文',                flag: '🇨🇳' },
  { code: 'ar',    label: 'العربية',             flag: '🇸🇦' },
  { code: 'ru',    label: 'Русский',             flag: '🇷🇺' },
];

export const API_URL = 'http://localhost:3001/api/process';
