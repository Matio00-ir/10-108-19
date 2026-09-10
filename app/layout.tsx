import type { Metadata, Viewport } from "next";
import "./globals.css";
import { vazirmatn } from "./fonts";
import { SITE } from "@/lib/constants";
import { CartProvider } from "@/features/cart/CartContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MiniCartDrawer } from "@/features/cart/MiniCartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "فروشگاه اینترنتی تخصصی مکمل‌های ورزشی، ویتامین‌ها و محصولات داروخانه‌ای با ضمانت اصالت کالا و ارسال سریع.",
  applicationName: SITE.name,
  keywords: [
    "مکمل ورزشی",
    "وی پروتئین",
    "ویتامین",
    "داروخانه اینترنتی",
    "کراتین",
    "امگا 3",
  ],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description:
      "مکمل و محصولات داروخانه‌ای اصل، با مشاوره تخصصی داروساز و ارسال سریع.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b6bcb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-800">
        <CartProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <MiniCartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
