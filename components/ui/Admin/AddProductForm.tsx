import React, { useState, useMemo, ChangeEvent, useEffect, useRef } from 'react';
import slugify from 'slugify';
import firebase from 'firebase/app';
import fireStorage from 'app/fireStorage';
import fireCollection from 'app/fireCollection';
import TextInput from 'components/elements/TextInput';
import MapDataForm, { MapData, MapDataListToObject } from 'components/MapDataForm';
import Uploader, { UploaderRef } from 'components/Uploader';
import Button from 'components/elements/Button';
import useMappedState from 'hooks/useMappedState';
import type { Product } from 'types/models';

type Props = JSX.IntrinsicElements['input'] & {
  onSubmit: (payload: Product) => void;
}

function AddProductForm({ onSubmit }: Props) {
  const ref = useMemo(() => fireCollection.product.doc(), []);
  const [product, setProduct, set] = useMappedState<Product, [ChangeEvent<HTMLInputElement>]>(
    {
      name: '',
      price: 0,
      description: '',
      link: '',
      category: '',
      specs: {},
      _ui: {},
    },
    propSetter =>
      e => propSetter(e.target.value)
  );
  const [specs, setSpecs] = useState<MapData[]>([]);
  const productLink = useMemo(() => (product.link || slugify(product.name)).toLowerCase(), [product]);
  const uploaderRef = useRef<UploaderRef>(null);

  useEffect(() => setProduct({
    ...product,
    specs: MapDataListToObject(specs),
  }), [specs]);

  return (<>
    <form id="addProductForm" onSubmit={e => {
      e.preventDefault();
      uploaderRef.current?.upload();

      ref.set({
        ...product,
        link: productLink,
        price: Number(product.price),
        _created: firebase.firestore.Timestamp.now(),
        _updated: firebase.firestore.Timestamp.now(),
        _deleted: null,
      })
        .then(() => onSubmit(product));
    }}>
      <fieldset>
        <legend>Tambah Produk</legend>

        <TextInput
          placeholder="Nama produk"
          value={product.name}
          onChange={set('name')}
          required
        />

        <TextInput
          placeholder="Harga produk"
          value={product.price}
          type="number"
          onChange={set('price')}
          required
        />

        <TextInput
          placeholder="Dekripsi produk"
          value={product.description}
          onChange={set('description')}
          required
        />

        <TextInput
          placeholder="Link produk"
          value={productLink}
          onChange={set('link')}
          required
        />

        <TextInput
          placeholder="Kategori"
          value={product.category}
          onChange={set('category')}
          required
        />
      </fieldset>
    </form>

    <Uploader ref={uploaderRef} storageRef={fireStorage.product.child(ref.id)} />

    <MapDataForm dataHandler={[specs, setSpecs]} />

    <Button type="submit" form="addProductForm">Save</Button>
  </>)
};

export default React.memo(AddProductForm);
