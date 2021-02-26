import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import 'twin.macro';
import Image from 'next/image';
import Link from 'next/link';
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
        <HighlightedProduct className="group">
          <HighlightedProduct.ImageContainer>
            <Image
              src="/assets/index/M4.png"
              layout="fill"
              objectFit="cover"
            />
          </HighlightedProduct.ImageContainer>

          <HighlightedProduct.Caption>
            <HighlightedProduct.CaptionTitle>
              Ministic
            </HighlightedProduct.CaptionTitle>

            <HighlightedProduct.CaptionSubtitle>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, quaerat.
            </HighlightedProduct.CaptionSubtitle>

            <Link href="/product/ministic" shallow>
              <HighlightedProduct.ActionBtn>
                Lihat detail
              </HighlightedProduct.ActionBtn>
            </Link>

          </HighlightedProduct.Caption>
        </HighlightedProduct>

        <HighlightedProduct className="group">
          <HighlightedProduct.ImageContainer>
            <Image
              src="/assets/index/M4.png"
              layout="fill"
              objectFit="cover"
            />
          </HighlightedProduct.ImageContainer>

          <HighlightedProduct.Caption tw="right-0 items-end text-right">
            <HighlightedProduct.CaptionTitle>
              Ministic
            </HighlightedProduct.CaptionTitle>

            <HighlightedProduct.CaptionSubtitle>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur esse cum provident aliquam inventore, quam tempora rem molestias velit accusamus temporibus consectetur vero blanditiis natus, repellat animi neque soluta reprehenderit? Consequuntur esse aut veritatis deleniti. Voluptatum, iure esse! Saepe, quibusdam cumque sapiente est perspiciatis nisi minus sunt recusandae voluptatum sit necessitatibus consectetur modi tenetur fugit laborum pariatur vel commodi fuga natus enim molestias. Numquam ipsam corrupti totam sunt rerum ratione iusto, maiores consectetur beatae eos assumenda sequi quia nesciunt illum, atque excepturi labore cupiditate pariatur doloribus natus dolorum repudiandae nisi ut tenetur. Eaque repellat nihil quo! Facere at sint consequatur!
            </HighlightedProduct.CaptionSubtitle>

            <Link href="/product/ministic" shallow>
              <HighlightedProduct.ActionBtn>
                Lihat detail
              </HighlightedProduct.ActionBtn>
            </Link>

          </HighlightedProduct.Caption>
        </HighlightedProduct>

        <HighlightedProduct className="group">
          <HighlightedProduct.ImageContainer>
            <Image
              src="/assets/index/M4.png"
              layout="fill"
              objectFit="cover"
            />
          </HighlightedProduct.ImageContainer>

          <HighlightedProduct.Caption>
            <HighlightedProduct.CaptionTitle>
              Ministic
            </HighlightedProduct.CaptionTitle>

            <HighlightedProduct.CaptionSubtitle>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, quaerat.
            </HighlightedProduct.CaptionSubtitle>

            <Link href="/product/ministic" shallow>
              <HighlightedProduct.ActionBtn>
                Lihat detail
              </HighlightedProduct.ActionBtn>
            </Link>

          </HighlightedProduct.Caption>
        </HighlightedProduct>
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
