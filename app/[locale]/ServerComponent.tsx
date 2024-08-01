// ServerComponent.tsx
import { Inter } from "next/font/google";
import { getMessages } from "next-intl/server";
import React from "react";
import ClientComponent from "./ClientComponent";
// import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

interface ServerComponentProps {
  children: React.ReactNode;
  locale: string;
}

export default async function ServerComponent({
  children,
  locale,
}: ServerComponentProps) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/icon.jpeg" type="image/jpeg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
          <ClientComponent locale={locale} messages={messages}>
            {children}
          </ClientComponent>
      </body>
    </html>
  );
}
