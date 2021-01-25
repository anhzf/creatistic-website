import Head from 'next/head'
import Image from 'next/image'
import tw from 'twin.macro'

const Container = tw.div`min-h-screen w-screen flex flex-col items-center justify-center`
const MainContainer = tw.main`flex flex-col items-center justify-center`
const HeaderContentContainer = tw.section`absolute left-1/2 bottom-0 w-full max-w-screen-md px-5 py-10 transform -translate-x-1/2 lg:-translate-y-10 2xl:-translate-y-20 flex flex-col justify-center text-white`

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Creatistic Official Website - Mengabadikan Cinta Dalam Furnitur</title>
        <meta name="description" content="Menjawab kebutuhan furnitur anda, menciptakan cinta dalam furnitur. Memberikan anda suatu hal yang baru intuk kemajuan negri Indonesia melalui pengembangan UKM. Creatistic.id untuk Indonesia." />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="relative h-screen w-full font-semibold">
        <Image
          src='/assets/bg panjang.jpg'
          layout="fill"
          objectFit="cover"
          alt="logo creatistic"
        />
        <div className="absolute bottom-1/4 right-0">
          <Image
            src='/assets/bg.png'
            width={800}
            height={450}
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <div className="absolute left-1/2 sm:left-1/3 lg:left-1/4 md:right-1/3 top-8 sm:top-2 transform -translate-x-1/2">
          <Image
            src='/assets/logo creatistic.png'
            width={300}
            height={300}
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <HeaderContentContainer>
          <h2 className="my-2 font-mont text-6xl sm:text-8xl xl:text-9xl">Coming Soon</h2>
          <h3 className="font-light sm:text-lg">Menjawab kebutuhan furnitur anda, menciptakan cinta dalam furnitur. Memberikan anda suatu hal yang baru intuk kemajuan negri Indonesia melalui pengembangan UKM. Creatistic.id untuk Indonesia.</h3>
        </HeaderContentContainer>
      </header>

      <MainContainer />
    </Container>
  )
}
