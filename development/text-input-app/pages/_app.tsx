import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider>
      <div className="prose">
        <Component {...pageProps} />
      </div>
    </MDXProvider>
  );
}
