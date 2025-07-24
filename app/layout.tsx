// app/layout.tsx
import "@mantine/core/styles.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DES-BOMS",
  description: "Inventory and Batch Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <MantineProvider>
          <ModalsProvider>
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
