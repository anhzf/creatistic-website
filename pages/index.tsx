import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import 'twin.macro';
import { HiX, HiMail } from 'react-icons/hi';
import fireStorage from 'app/fireStorage';
import MainLayout from 'components/layouts/MainLayout';
import HighlightedProduct from 'components/ui/Index/HighlightedProduct';
import SubscribeNewsletter from 'components/SubscribeNewsletter';
import Overlay from 'components/elements/Overlay';
import Alert from 'components/elements/Alert';
import Carousel, { Slide } from 'components/Carousel';
import useFireStorageFileList from 'hooks/useFireStorageFileList';

const ALERT_TIMEOUT = 10000;

export default function Home() {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<ReactNode | null>(null);
  const [homeCarouselMedia] = useFireStorageFileList(fireStorage.homeCarousel);
  const slides = useMemo(
    () => homeCarouselMedia.map(media => ({
      imgSrc: media.url,
      objectFit: media.metadata.customMetadata?.objectFit,
    } as Slide)),
    [homeCarouselMedia],
  );

  useEffect(() => {
    setTimeout(setIsSubscribeModalOpen, 10000, true);
  }, []);

  useEffect(() => {
    if (alertMsg) {
      setTimeout(() => setAlertMsg(null), ALERT_TIMEOUT);
    }
  }, [alertMsg])

  return (
    <MainLayout className="items-center">
      <header className="relative w-full px-2 sm:px-4 py-4 flex flex-col items-center">
        <Carousel
          slides={slides}
          rounded
          className="w-full max-w-screen-lg h-80 sm:h-96"
        />
      </header>

      <main tw="w-full max-w-screen-lg py-8 flex flex-col justify-center items-center gap-y-2 sm:gap-y-5">
        <HighlightedProduct
          title="Ministic"
          description="Sebuah meja kecil minimalis terbuat dari kayu jati yang mampu memberikan estetika lebih pada ruangan anda"
          imgSrc="/assets/index/highlight_ministic.png"
          href="/product/ministic"
        />

        <HighlightedProduct
          title="Stalactic"
          description="Rak bungan minimalis yang mampu mempercantik ruangan anda, bentuknya yang minimalis mampu memberikan kesan elegan bagi ruangan, cocok sekali untuk anda yang menyukai desain minimalis"
          imgSrc="/assets/index/highlight_stalactic.png"
          href="/product/stalactic"
          right
        />

        <HighlightedProduct
          title="Stairtic"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, quod."
          imgSrc="/assets/index/highlight_stairtic.png"
          href="/product/ministic"
        />

        <HighlightedProduct
          title="Stifftic"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, quod."
          imgSrc="/assets/index/highlight_stifftic.png"
          href="/product/ministic"
          right
        />
      </main>

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
