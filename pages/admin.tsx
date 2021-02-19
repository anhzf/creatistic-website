import { fbs } from 'app/services/firebaseClient';
import Button from 'components/elements/Button';
import TextInput from 'components/elements/TextInput';
import MainLayout from 'components/layouts/MainLayout';
import MapDataForm, { MapData } from 'components/MapDataForm';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import slugify from 'slugify';
import { Product } from 'types/models';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(undefined);

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
  )
}

const AddProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    images: [],
    description: '',
    link: '',
    category: '',
    specs: {},
    _ui: {},
  });
  const [specs, setSpecs] = useState<MapData[]>([]);
  const set = useCallback(
    (keyName: keyof Product) => useMemo(
      () => (e: ChangeEvent<HTMLInputElement>) => setProduct({
        ...product,
        [keyName]: e.target.value,
      }),
      [product]),
    [product],
  );
  const productLink = useMemo(() => product.link || slugify(product.name), [product])

  return (<>
    <form>
      <fieldset>
        <legend>Tambah Produk</legend>

        <TextInput
          placeholder="Nama produk"
          value={product.name}
          onChange={set('name')}
        />

        <TextInput
          placeholder="Harga produk"
          value={product.price}
          type="number"
          onChange={set('price')}
        />

        <TextInput
          placeholder="Dekripsi produk"
          value={product.description}
          onChange={set('description')}
        />

        <TextInput
          placeholder="Link produk"
          value={productLink}
          onChange={set('link')}
        />

        <TextInput
          placeholder="Kategori"
          value={product.category}
          onChange={set('category')}
        />
      </fieldset>
    </form>

    <MapDataForm dataHandler={[specs, setSpecs]} />
  </>)
}

export default function Admin() {
  const [user, loading, error] = useAuthState(fbs.auth);

  return (
    <MainLayout>
      {error && <span className="bg-red-500">{error}</span>}
      {loading ? <span>Loading...</span>
        : user ? (<>

          <AddProductForm />

        </>) : <LoginForm />}
    </MainLayout>
  )
}
