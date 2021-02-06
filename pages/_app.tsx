import GlobalStyles from 'components/GlobalStyles';
import type { AppProps } from 'next/dist/next-server/lib/router/router';
import 'animate.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
