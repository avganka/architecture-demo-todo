import rootService from '@/core/services';
import { RootProvider } from '@/shared/context/root';
import '@/styles/globals.css';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';

enableStaticRendering(typeof window === 'undefined');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider rootService={rootService}>
      <Component {...pageProps} />
    </RootProvider>
  );
}
