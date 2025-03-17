import { Geist } from 'next/font/google';
import Head from 'next/head';
import type { PropsWithChildren } from 'react';

import styles from './Layout.module.css';

const geist = Geist({
  subsets: ['latin'],
});

type LayoutProps = PropsWithChildren<{
  title: string;
  metaDescription: string;
}>;

export const Layout = ({
  children,
  title,
  metaDescription = '',
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geist.className}`}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};
