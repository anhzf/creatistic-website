import { ReactNode, useEffect, useState } from 'react';
import tw from 'twin.macro';
import { HiX, HiMail } from 'react-icons/hi';
import SubscribeNewsletter from 'components/SubscribeNewsletter';
import Overlay from 'components/elements/Overlay';
import Alert from 'components/elements/Alert';
import MainLayout from 'components/layouts/MainLayout';

const MainContainer = tw.main`flex flex-col items-center justify-center`;
const ALERT_TIMEOUT = 10000;

export default function Home() {
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
    <MainLayout>
      <header className="relative h-screen w-full">
      </header>

      <MainContainer>
      </MainContainer>

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
