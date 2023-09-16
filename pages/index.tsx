import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - BENZINGA</title>
      </Head>
      <main>
        <h1>Home Page</h1>
      </main>
    </>
  );
}
