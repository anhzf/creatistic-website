import Head from 'next/head'
import Button from '../components/elements/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>Creatistic Official Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button>Click Me!</Button>
    </>
  )
}
