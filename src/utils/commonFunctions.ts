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