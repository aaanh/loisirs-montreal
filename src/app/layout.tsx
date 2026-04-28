import "./globals.css";
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import { I18nProvider } from "@/components/i18n-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://loisirs-montreal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Loisirs MTL - Generateur d'URL",
    template: "%s | Loisirs MTL",
  },
  description:
    "Generez des URL de recherche pour les activites de Loisirs Montreal et partagez vos filtres facilement.",
  keywords: [
    "Loisirs Montreal",
    "activites Montreal",
    "sports Montreal",
    "URL builder",
    "recherche loisirs",
    "arrondissements Montreal",
  ],
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Loisirs MTL",
    title: "Loisirs MTL - Generateur d'URL",
    description:
      "Generez des URL de recherche pour les activites de Loisirs Montreal et partagez vos filtres facilement.",
    locale: "fr_CA",
    alternateLocale: "en_CA",
  },
  twitter: {
    card: "summary",
    title: "Loisirs MTL - Generateur d'URL",
    description:
      "Generez des URL de recherche pour les activites de Loisirs Montreal et partagez vos filtres facilement.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <Analytics />
      <body className={`${inter.className} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
