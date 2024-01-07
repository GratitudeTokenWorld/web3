import { createTranslation } from '@/i18n/server';

export default async function Home({ params: { locale } }: any)
{
    const { t } = await createTranslation(locale, 'common');

    return (
        <section>
            { t('common:VALIDATION_IS_EMAIL') }
        </section>
    );
}
