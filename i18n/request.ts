import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { ELanguage, SUPPORTED_LANGUAGES, isSupportedLanguage } from './locales';

const detectLocale = async (): Promise<ELanguage> => {
    const store = await cookies();
    const cookieLocale = store.get('locale')?.value;

    if (isSupportedLanguage(cookieLocale)) {
        return cookieLocale;
    }

    const headerList = await headers();
    const acceptLanguage = headerList.get('accept-language');

    if (acceptLanguage) {
        const preferredLocales = acceptLanguage
            .split(',')
            .map(lang => lang.split(';')[0].trim().toLowerCase());

        for (const preferredLocale of preferredLocales) {
            const supportedLocale = SUPPORTED_LANGUAGES.find((locale) => (
                preferredLocale === locale || preferredLocale.startsWith(`${locale}-`)
            ));

            if (supportedLocale) {
                return supportedLocale;
            }
        }
    }

    return ELanguage.EN;
};

const loadMessages = async (locale: ELanguage) => {
    const [
        common,
        auth,
        accountSettings,
        dashboard,
        buyer,
    ] = await Promise.all([
        import(`../messages/${locale}/common.json`),
        import(`../messages/${locale}/auth.json`),
        import(`../messages/${locale}/account-settings.json`),
        import(`../messages/${locale}/dashboard.json`),
        import(`../messages/${locale}/buyer.json`),
    ]);

    return {
        ...common.default,
        ...auth.default,
        ...accountSettings.default,
        ...dashboard.default,
        ...buyer.default,
    };
};

export default getRequestConfig(async () => {
    const locale = await detectLocale();

    return {
        locale,
        messages: await loadMessages(locale),
    };
});
