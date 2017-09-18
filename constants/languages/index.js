import en from './en';

const i18n_strings = {
    en,
}

let language = 'en';

export const setLanguage = (_language) => {
    language = _language;

    if (_language === 'he' && typeof document !== 'undefined') {
        document.body.className += ' rtl';
    }
}

export const strings = () => {

    if (!i18n_strings[language]) {
        language = 'en';
    }

    return i18n_strings[language];
}

