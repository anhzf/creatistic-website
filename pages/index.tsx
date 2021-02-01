import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import { HiX } from 'react-icons/hi'
import SubscribeNewsletter from 'components/SubscribeNewsletter';
import Overlay from 'components/elements/Overlay';
import Alert from 'components/elements/Alert';

const title = 'Creatistic Official Website - Mengabadikan Cinta Dalam Furnitur';
const desc = 'Menjawab kebutuhan furnitur anda, menciptakan cinta dalam furnitur. Memberikan anda suatu hal yang baru intuk kemajuan negri Indonesia melalui pengembangan UKM. Creatistic.id untuk Indonesia.';
const Container = tw.div`min-h-screen w-screen flex flex-col items-center justify-center`;
const MainContainer = tw.main`flex flex-col items-center justify-center`;
const HeaderContentContainer = tw.section`absolute left-1/2 bottom-0 w-full max-w-screen-md px-5 py-10 transform -translate-x-1/2 lg:-translate-y-10 2xl:-translate-y-20 flex flex-col justify-center text-white`;

export default function Home() {
  const router = useRouter();
  const ALERT_TIMEOUT = 10000;
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<ReactNode | null>(null);

  useEffect(() => {
    setTimeout(setIsSubscribeModalOpen, 10000, true);
  }, []);

  useEffect(() => {
    if (alertMsg) {
      setTimeout(() => setAlertMsg(null), ALERT_TIMEOUT);
    }
  }, [alertMsg])

  return (
    <Container>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={desc} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:image" content="/assets/logo creatistic.png" />
        <link rel="icon" href="/favicon.ico" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={router.pathname} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content={router.pathname} />
        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="yRVHmDY9GNvr828pyT4AW_pb4NiRamy3mTdbVEucY2I" />
      </Head>

      <header className="relative h-screen w-full font-semibold">
        <Image
          src="/assets/bg panjang.jpg"
          layout="fill"
          objectFit="cover"
          alt="logo creatistic"
        />

        <div className="absolute bottom-1/4 right-0">
          <Image
            src="/assets/bg.png"
            width={800}
            height={450}
            layout="intrinsic"
            objectFit="contain"
          />
        </div>

        <div className="absolute left-1/2 sm:left-1/3 lg:left-1/4 md:right-1/3 top-8 sm:top-2 transform -translate-x-1/2">
          <Image
            src="/assets/logo creatistic.png"
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

      <MainContainer>
        {isSubscribeModalOpen &&
          <Overlay className="flex flex-col justify-center">
            <Overlay.CloseButton onClick={() => setIsSubscribeModalOpen(false)}>
              <HiX className="mx-auto text-2xl" />
            </Overlay.CloseButton>

            <SubscribeNewsletter
              title="Dapatkan info menarik dari kita!"
              description="Daftarkan emailmu untuk menjadi orang pertama yang mendapat info menarik dan juga info giveaway dari kita!"
              onNewSubscriberRegistered={(data) => {
                setIsSubscribeModalOpen(false);
                setAlertMsg(<h1 className="font-bold text-3xl text-gray-900">Terimakasih {data.name}!</h1>);
              }}
            />
          </Overlay>
        }

        {alertMsg &&
          <Alert timeout={ALERT_TIMEOUT}>
            {alertMsg}
          </Alert>
        }
      </MainContainer>
    </Container>
  )
}
