import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
import slugify from 'slugify';
import firebase from 'firebase/app';
import fireStorage from 'app/fireStorage';
import fireCollection from 'app/fireCollection';
import getProduct from 'app/apis/getProduct';
import TextInput from 'components/elements/TextInput';
import MapDataForm, { MapData, MapDataListToObject, ObjectToMapDataList } from 'components/MapDataForm';
import Uploader from 'components/Uploader';
import Button from 'components/elements/Button';
import useMappedState from 'hooks/useMappedState';
import type { Product } from 'types/models';

type Props = JSX.IntrinsicElements['input'] & {
  productId?: string;

  onSubmit: (payload: Product) => void;
}

const ProductForm = function ({ productId, onSubmit }: Props) {
  const [docRef, setDocRef] = useState(fireCollection.product.doc(productId));
  const [productDataLoading, setProductDataLoading] = useState(true);
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

  useEffect(() => {
    (async () => {
      const doc = await getProduct(productId);

      setProductDataLoading(false);

      if (doc.exists) {
        const docData = doc.data() as Product;

        setDocRef(doc.ref);
        setProduct(docData);
        setSpecs(ObjectToMapDataList(docData.specs));
      }
    })();
  }, []);

  useEffect(() => set('specs').setVal(MapDataListToObject(specs)), [specs]);

  return productDataLoading
    ? (<span>Loading data...</span>)
    : (<>
      <form id="ProductForm" onSubmit={e => {
        e.preventDefault();

        docRef.set({
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
          <legend>Form Produk</legend>

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

      <Uploader storageRef={fireStorage.product.child(docRef.id)} />

      <h5>Spesifikasi Produk</h5>
      <MapDataForm dataHandler={[specs, setSpecs]} />

      <Button type="submit" form="ProductForm">Save</Button>
    </>);
};

export default React.memo(ProductForm);
