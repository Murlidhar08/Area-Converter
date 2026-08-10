import i18n from '@/i18n/i18n';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): any {
  return localStorage.getItem(key);
}

export function numberToWords(num: number | string, lang?: string): string | null {
  let val = Number(num);
  if (!Number.isFinite(val))
    return null;

  const currentLang = (lang || (typeof localStorage !== "undefined" ? localStorage.getItem("app_language") : null) || "en").toLowerCase();

  const getWord = (key: string): string => {
    return i18n.t(`words.${key}`, { lng: currentLang }) || key;
  };

  if (val === 0) return getWord("zero");

  const units = [
    { value: 1e7, wordKey: "crore" },
    { value: 1e5, wordKey: "lakh" },
    { value: 1e3, wordKey: "thousand" },
    { value: 1e2, wordKey: "hundred" },
  ];

  const parts: string[] = [];

  for (const unit of units) {
    if (val >= unit.value) {
      const count = Math.floor(val / unit.value);

      parts.push(`${count} ${getWord(unit.wordKey)}`);

      val %= unit.value;
    }
  }

  if (val > 0) parts.push(Math.round(val).toString());

  parts.push(getWord("only"));

  return parts.join(" ");
}