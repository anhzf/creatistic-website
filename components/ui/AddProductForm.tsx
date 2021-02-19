import React, { useState, useCallback, useMemo, ChangeEvent } from 'react';
import slugify from 'slugify';
import TextInput from 'components/elements/TextInput';
import MapDataForm, { MapData } from 'components/MapDataForm';
import type { Product } from 'types/models';

type Props = JSX.IntrinsicElements['input'] & {
  onSubmit: (payload: Product) => void;
}

export default function AddProductForm({ onSubmit }: Props) {
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
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit(product);
    }}>
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
