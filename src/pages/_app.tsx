import "@/styles/globals.css";

import type { AppProps } from "next/app";

import "@fontsource/nunito";
import "@fontsource/sofia-sans";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
