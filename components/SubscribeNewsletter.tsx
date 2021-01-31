import subscribeNewsletterRequest from 'app/requests/subscribeNewsletterRequest';
import { useState } from 'react'

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        subscribeNewsletter();
      }}
      className="self-center w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col items-stretch" {...props}
    >
      <div className="first:rounded-t-xl last:rounded-b-xl p-3  bg-gradient-to-br from-purple-500 to-indigo-500">
        <h3 className="leading-normal text-center text-2xl text-white font-bold">{title}</h3>
      </div>
      <div className="first:rounded-t-xl last:rounded-b-xl py-4 px-6 bg-white flex flex-col space-y-2">
        <span>{description}</span>
        <div className="self-stretch p-4 flex flex-col items-center space-y-4">
          <input
            placeholder={nameInputPlaceholder}
            value={name}
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-xs py-3 px-5 border-2 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-70"
          />
          <input
            placeholder={emailInputPlaceholder}
            value={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-xs py-3 px-5 border-2 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-70"
          />
        </div>

        <span className="text-xs text-red-600 italic">*kami berkomitmen untuk menjaga informasi yang anda masukkan ini supaya tidak disalah gunakan</span>
      </div>
      <button
        type="submit"
        className="first:rounded-t-xl last:rounded-b-xl py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl text-white font-semibold hover:from-indigo-400 hover:to-purple-500 focus:outline-none focus:from-indigo-600 focus:to-purple-600"
      >
        Daftar!
      </button>
    </form>
  )
}
