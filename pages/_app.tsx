import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Roboto } from 'next/font/google';
import { Container } from 'react-bootstrap';
import styles from '@/styles/app.module.css';
import NavBar from '@/components/NavBar';
import NextNProgress from "nextjs-progressbar";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.className}`}>
      <Head>
        <title key="title">YesterTrade</title>
        <meta name="description" content="Accurate Stock Prices" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress />
      <NavBar />
      <Container className={ styles.pageContainer }>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
