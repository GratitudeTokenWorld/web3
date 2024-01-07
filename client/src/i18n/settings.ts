import type { InitOptions } from 'i18next';

export const defaultNS = 'common';
export const fallbackLng = 'en';
export const locales = [fallbackLng, 'fa'];

export type LocaleTypes = (typeof locales)[number];

export function getOptions(lang = fallbackLng, ns = defaultNS): InitOptions
{
    return {
        // debug: true, // Set to true to see console logs
        supportedLngs: locales,
        fallbackLng,
        lng: lang,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    };
}
