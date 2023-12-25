import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Cooper Saye</title>
        <meta
          name='description'
          content='I’m passionate about creating & discovering delightful products.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link rel='icon' href='/favicons/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicons/favicon-16x16.png'
        />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Fragment>
  )
}
