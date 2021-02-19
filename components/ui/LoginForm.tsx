import React, { useState } from 'react';
import { fbs } from 'app/services/firebaseClient';
import Button from 'components/elements/Button';
import TextInput from 'components/elements/TextInput';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <form
      className="self-center w-full max-w-md p-4"
      onSubmit={e => {
        e.preventDefault();
        fbs.auth.signInWithEmailAndPassword(email, password)
          .catch(err => setError(err.message));
      }}
    >
      <fieldset className="w-full p-5 bg-white shadow flex flex-col gap-4">
        <legend className="bg-gray-700 text-white">Login</legend>

        <TextInput
          placeholder="email"
          value={email}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />

        <TextInput
          placeholder="password"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        {error && <span className="bg-red-500 text-white">{error}</span>}

        <Button type="submit">Login</Button>
      </fieldset>
    </form>
  );
}
