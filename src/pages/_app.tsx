import rootService from '@/core/services';
import { RootProvider } from '@/shared/context/root';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider rootService={rootService}>
      <Component {...pageProps} />
    </RootProvider>
  );
}
