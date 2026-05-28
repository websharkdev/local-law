import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/lib/metadata";
import MainProvider from "@/components/providers/main.provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import NextTopLoader from 'nextjs-toploader';

const fontInstrumentSans = Instrument_Sans({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
});


export const metadata: Metadata = defaultMetadata;

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={cn("h-full", "antialiased", fontInstrumentSans.className)}
            suppressHydrationWarning
            suppressContentEditableWarning
        >
            <body className="h-full flex flex-col bg-background">
                <NextTopLoader
                    color="var(--primary)"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 var(--ds-10) var(--primary),0 0 var(--ds-5) var(--primary)"
                />
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <MainProvider>
                        {children}
                    </MainProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
