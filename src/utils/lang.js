const LANG = /^([a-z]{2})-[A-Z]{2}$/;

export const DEFAULT_LANG = 'en-US';
export const DEFAULT_SHORT_LANG = 'en';

export const getShortLang = (longLang) => {
    if (LANG.test(longLang)){
        return longLang.match(LANG)[1];
    } else {
        return longLang;
    }
}