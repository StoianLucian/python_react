import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ro from './locales/ro.json';


export enum TranslationKey {
    DASHBOARD = "dashboard",
    PROFILE_MENU = "profileMenu",
    LOGIN_PAGE = "loginPage",
    REGISTER_PAGE = "registerPage",
    FILES_PAGE = "filesPage",
    ERRORS = "errors",
    SUCCESS = "success",
}

export const translations = {
    dashboard: {
        profile: `${TranslationKey.DASHBOARD}.profile`,
        settings: `${TranslationKey.DASHBOARD}.settings`,
        home: `${TranslationKey.DASHBOARD}.home`,
        pdf: `${TranslationKey.DASHBOARD}.PDF`,
    },

    profileMenu: {
        profile: `${TranslationKey.PROFILE_MENU}.profile`,
        settings: `${TranslationKey.PROFILE_MENU}.settings`,
        logout: `${TranslationKey.PROFILE_MENU}.logout`,
        ro: `${TranslationKey.PROFILE_MENU}.ro`,
        en: `${TranslationKey.PROFILE_MENU}.en`,
    },

    loginPage: {
        login: `${TranslationKey.LOGIN_PAGE}.login`,
        account: `${TranslationKey.LOGIN_PAGE}.account`,
        password: `${TranslationKey.LOGIN_PAGE}.password`,
        rememberMe: `${TranslationKey.LOGIN_PAGE}.rememberMe`,
        registerNewAccount: `${TranslationKey.LOGIN_PAGE}.registerNewAccount`,
    },

    registerPage: {
        register: `${TranslationKey.REGISTER_PAGE}.register`,
        username: `${TranslationKey.REGISTER_PAGE}.username`,
        email: `${TranslationKey.REGISTER_PAGE}.email`,
        password: `${TranslationKey.REGISTER_PAGE}.password`,
        confirmPassword: `${TranslationKey.REGISTER_PAGE}.confirmPassword`,
        alreadyHaveAccount: `${TranslationKey.REGISTER_PAGE}.aldreadyHaveAccount`,
    },

    filesPage: {
        downloadFile: `${TranslationKey.FILES_PAGE}.downloadFile`,
    },

    errors: {
        isRequired: `${TranslationKey.ERRORS}.isRequired`,
        invalidEmail: `${TranslationKey.ERRORS}.invalidEmail`,
        passwordsDoNotMatch: `${TranslationKey.ERRORS}.passwordsDoNotMatch`,
        userNotFound: `${TranslationKey.ERRORS}.user_not_found`,
    },

    success: {
        accountCreated: `${TranslationKey.SUCCESS}.accountCreated`,
    },
} as const;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ro: { translation: ro },
        },
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        detection: {
            // order in which detection is done
            order: ['localStorage', 'navigator'],
            // where to store the language
            caches: ['localStorage'],
        },
    });

export default i18n;