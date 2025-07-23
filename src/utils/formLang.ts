import { LANG, LangType } from '../config/lang';

const currentLang: { value: LangType } = { value: 'en' };

export function t(key: keyof (typeof LANG)['en']['labels']): string {
  return LANG[currentLang.value].labels[key] || key;
}

export function direction(): 'ltr' | 'rtl' {
  return LANG[currentLang.value].direction;
}

export function toggleLang() {
  currentLang.value = currentLang.value === 'en' ? 'fa' : 'en';
}

export function getCurrentLang(): LangType {
  return currentLang.value;
}
