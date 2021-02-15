import { ReactNode, useEffect, useState } from 'react';
import tw from 'twin.macro';
import { HiX, HiMail } from 'react-icons/hi';
import MainLayout from 'components/layouts/MainLayout';
import SubscribeNewsletter from 'components/SubscribeNewsletter';
import Overlay from 'components/elements/Overlay';
import Alert from 'components/elements/Alert';
import Carousel, { Slide } from 'components/Carousel';
import getSlides from 'app/apis/getSlides';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const MainContainer = tw.main`flex flex-col items-center justify-center`;
const ALERT_TIMEOUT = 10000;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    slideImages: getSlides(),
  },
});

export default function Home({ slideImages }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<ReactNode | null>(null);
  const [slides] = useState<Slide[]>(slideImages);

  useEffect(() => {
    setTimeout(setIsSubscribeModalOpen, 10000, true);
  }, []);

  useEffect(() => {
    if (alertMsg) {
      setTimeout(() => setAlertMsg(null), ALERT_TIMEOUT);
    }
  }, [alertMsg])

  return (
    <MainLayout>
      <header className="relative w-full px-2 sm:px-4 py-4 flex flex-col items-center">
        <Carousel
          slides={slides}
          rounded
          className="w-full max-w-screen-lg h-80 sm:h-96"
        />
      </header>

      <MainContainer />

      {isSubscribeModalOpen ?
        <Overlay className="flex flex-col justify-center">
          <Overlay.CloseButton onClick={() => setIsSubscribeModalOpen(false)}>
            <HiX className="mx-auto text-2xl" />
          </Overlay.CloseButton>

          <SubscribeNewsletter
            title="Dapatkan info menarik dari kita!"
            description="Daftarkan emailmu untuk menjadi orang pertama yang mendapat info menarik dan juga info giveaway dari kita!"
            onNewSubscriberRegistered={(data) => {
              setIsSubscribeModalOpen(false);
              setAlertMsg((
                <h1 className="font-medium text-3xl text-gray-900">Terima kasih{' '}
                  <span className="font-bold text-blue-500">{data.name}</span>! Ada sesuatu nunggu di email kamu nih...✨
                </h1>
              ));
            }}
          />
        </Overlay>
        : (
          <SubscribeNewsletter.Fab onClick={() => setIsSubscribeModalOpen(true)}>
            <HiMail className="m-auto text-3xl text-gray-900" />
          </SubscribeNewsletter.Fab>
        )
      }

      {alertMsg &&
        <Alert timeout={ALERT_TIMEOUT}>
          {alertMsg}
        </Alert>
      }
    </MainLayout>
  )
}
