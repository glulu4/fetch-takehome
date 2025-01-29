
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Providers from "@/components/theme-provider";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    absolute: config.name.metadata.title.absolute,
    default: config.name.metadata.title.default,
    template: config.name.metadata.title.template,
  },
  description: config.name.metadata.description,
  openGraph: {
    title: config.name.metadata.title.default,
    description: config.name.metadata.description,
    images: [
      signOgImageUrl({
        title: config.name.name,
      }),
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-6xl m-auto",
          fontSans.variable
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Header />
            {children}
            <Footer />
            </main>
        </Providers>
      </body>
    </html>
  );
}
