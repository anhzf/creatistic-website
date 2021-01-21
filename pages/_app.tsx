import '../styles/globals.css'
import type { AppProps } from 'next/dist/next-server/lib/router/router'
import GlobalStyles from '../components/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
