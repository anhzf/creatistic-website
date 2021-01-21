import Head from 'next/head'
import Image from 'next/image'
import tw from 'twin.macro'

const Container = tw.div`min-h-screen flex flex-row items-center justify-center`
const MainContainer = tw.main`flex flex-row items-center justify-center`

export default function Home() {
  return (
    <>
      <Container>
        <Head>
          <title>Creatistic Official Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="font-semibold text-center">
          <Image
            src='/assets/logo creatistic.png'
            width={300}
            height={300}
          />
          <h2 className="text-gray-400 text-8xl">Coming Soon</h2>
        </header>

        <MainContainer />
      </Container>
    </>
  )
}
