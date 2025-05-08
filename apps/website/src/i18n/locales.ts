import { z } from 'zod';

export const LOCALES = ['en', 'ja'] as const;
export const localeSchema = z.enum(LOCALES).default('en');

export type Locale = (typeof LOCALES)[number];

export type I18nText = Record<Locale, string | null>;

export const i18nTextSchema = z
  .object({
    en: z.string().nullable(),
    ja: z.string().nullable(),
  })
  .default({
    en: null,
    ja: null,
  });

/**
 * 多言語テキストから特定の言語のテキストを取得する関数
 * @param i18nText 多言語テキスト
 * @param locale 言語
 * @param fallback フォールバックテキスト（指定されると必ず文字列を返す）
 */
export type PickI18nTextFunction = {
  (i18nText: I18nText, locale: Locale | string): string | null;
  (i18nText: I18nText, locale: Locale | string, fallback: string): string;
};

/**
 * 多言語テキストから特定の言語のテキストを取得する
 * fallbackが指定されている場合は必ず文字列を返す
 */
export const pickI18nText = ((i18nText: I18nText, locale: Locale | string, fallback?: string): string | null => {
  if (i18nText[locale as Locale]) {
    return i18nText[locale as Locale];
  }

  if (typeof fallback === 'string') {
    return fallback;
  }

  return null;
}) as PickI18nTextFunction;
