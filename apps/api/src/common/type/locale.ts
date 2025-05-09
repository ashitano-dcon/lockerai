/**
 * アプリケーションでサポートされているロケール
 */
export type Locale = 'en' | 'ja';

/**
 * ロケールごとのテキストを格納するレコード型
 */
export type I18nText = Record<Locale, string | null>;

/**
 * Prismaから返されるJSON値をI18nTextに変換するヘルパー関数
 */
export const toI18nText = (json: unknown): I18nText => {
  if (!json || typeof json !== 'object') {
    // デフォルト値を返す
    return { en: null, ja: null };
  }

  const result: Partial<I18nText> = {};
  const jsonObj = json as Record<string, unknown>;

  // 各ロケールのテキストを抽出
  if (typeof jsonObj['en'] === 'string') result['en'] = jsonObj['en'];
  else result['en'] = '';

  if (typeof jsonObj['ja'] === 'string') result['ja'] = jsonObj['ja'];
  else result['ja'] = '';

  return result as I18nText;
};
