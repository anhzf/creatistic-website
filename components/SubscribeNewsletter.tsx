import subscribeNewsletterRequest from 'app/requests/subscribeNewsletterRequest';
import { useCallback, useState } from 'react';
import tw from 'twin.macro';
import TextInput from 'components/elements/TextInput';
import { NewsletterSubscriber } from 'types/models';

const Container = tw.form`self-center w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col items-stretch`;

const SubscribeNewsletterInput = tw(TextInput)`w-full max-w-xs focus:ring-blue-gray-500`;

const Loader = (props: React.HTMLAttributes<HTMLOrSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  title: string;
  description: string;
  emailInputPlaceholder?: string;
  nameInputPlaceholder?: string;
  onNewSubscriberRegistered?: (subscriber: NewsletterSubscriber) => void;
}

export default function SubscribeNewsletter({
  title,
  description,
  emailInputPlaceholder = 'Masukkan email kamu disini...',
  nameInputPlaceholder = 'Masukkan nama kamu disini...',
  onNewSubscriberRegistered = () => void (0),
  ...props
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const subscribeNewsletter = useCallback(
    () => {
      setIsProcessing(true);
      const req = subscribeNewsletterRequest({ name, email });
      fetch(req).then((res) => {
        if (res.ok) onNewSubscriberRegistered?.({ name, email })
        else res.json().then((data) => setErrorMsg(data.message));

        setIsProcessing(false);
      });
    },
    [name, email],
  );

  return (
    <Container
      onSubmit={e => {
        e.preventDefault();
        // Reset form
        setName('');
        setEmail('');
        subscribeNewsletter();
      }}
      className="animate__animated animate__bounceIn"
      {...props}
    >
      <div className="first:rounded-t-xl last:rounded-b-xl p-3  bg-gradient-to-br from-blue-gray-600 to-blue-gray-800">
        <h3 className="leading-normal text-center text-2xl text-white font-bold">{title}</h3>
      </div>
      <div className="first:rounded-t-xl last:rounded-b-xl py-4 px-6 bg-white flex flex-col space-y-2">
        <span>{description}</span>
        <div className="self-stretch p-4 flex flex-col items-center space-y-4">
          <SubscribeNewsletterInput
            placeholder={nameInputPlaceholder}
            value={name}
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <SubscribeNewsletterInput
            placeholder={emailInputPlaceholder}
            value={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errorMsg && <span className="animate__animated animate__shakeX bg-red-500 text-white text-center rounded-full">{errorMsg}</span>}

        <span className="text-xs text-red-600 italic">*kami berkomitmen untuk menjaga informasi yang anda masukkan ini supaya tidak disalah gunakan</span>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="first:rounded-t-xl last:rounded-b-xl py-3 bg-gradient-to-br from-blue-gray-800 to-blue-gray-600 text-2xl text-white font-semibold inline-flex justify-center items-center hover:from-blue-gray-700 hover:to-blue-gray-600 focus:outline-none focus:from-blue-gray-700 focus:to-blue-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {
          isProcessing ?
            (<>
              <Loader className="animate-spin mx-2 w-6 h-6" />
              Memproses...
            </>)
            : 'Daftar!'
        }
      </button>
    </Container>
  )
}
