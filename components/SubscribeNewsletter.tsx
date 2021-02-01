import subscribeNewsletterRequest from 'app/requests/subscribeNewsletterRequest';
import { useState } from 'react';
import tw from 'twin.macro';
import TextInput from 'components/elements/TextInput';

const Container = tw.form`self-center w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col items-stretch`;

const SubscribeNewsletterInput = tw(TextInput)`w-full max-w-xs focus:ring-blue-gray-500`;

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  title: string;
  description: string;
  emailInputPlaceholder?: string;
  nameInputPlaceholder?: string;
}

export default function SubscribeNewsletter({
  title,
  description,
  emailInputPlaceholder = 'Masukkan email kamu disini...',
  nameInputPlaceholder = 'Masukkan nama kamu disini...',
  ...props
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const subscribeNewsletter = async () => {
    const req = subscribeNewsletterRequest({ name, email });
    const res = await fetch(req);
    const data = await res.json();

    console.log({ data });
  };

  return (
    <Container
      onSubmit={e => {
        e.preventDefault();
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

        <span className="text-xs text-red-600 italic">*kami berkomitmen untuk menjaga informasi yang anda masukkan ini supaya tidak disalah gunakan</span>
      </div>
      <button
        type="submit"
        className="first:rounded-t-xl last:rounded-b-xl py-3 bg-gradient-to-br from-blue-gray-800 to-blue-gray-600 text-2xl text-white font-semibold hover:from-blue-gray-700 hover:to-blue-gray-600 focus:outline-none focus:from-blue-gray-700 focus:to-blue-gray-700"
      >
        Daftar!
      </button>
    </Container>
  )
}
