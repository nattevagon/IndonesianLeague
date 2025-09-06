import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark overflow-x-hidden">
      <Head />
      <body className="antialiased bg-fourth-white dark:bg-primary-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
