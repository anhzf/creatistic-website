import { ChangeEvent, Dispatch, HTMLAttributes, SetStateAction, useMemo, useState } from 'react';
import tw, { styled } from 'twin.macro';
import firebase from 'firebase/app';
import { HiX } from 'react-icons/hi';
import fireCollection from 'app/fireCollection';
import orderViaWhatsapp from 'app/apis/orderViaWhatsapp';
import TextInput from 'components/elements/TextInput';
import useMappedState from 'hooks/useMappedState';
import type { Order } from 'types/models';

type ThePopupProps = {
  isOpen?: boolean
}

const ThePopup = styled.div<ThePopupProps>(({ isOpen }) => [
  !isOpen && tw`hidden`,
  tw`absolute bottom-full w-full max-w-lg bg-white border-t-4 border-indigo-200 rounded-lg shadow-xl`,
]);

const TheContainer = tw.div`relative w-full h-full`;

const TheSubmitButton = tw.button`py-3 bg-purple-500 text-center text-white rounded-b-lg focus:bg-purple-600`;

type Props = HTMLAttributes<HTMLDivElement> &  ThePopupProps & {
  stateHandler?: [
    Order,
    Dispatch<SetStateAction<Order>>,
  ];
  onCloseClick?: () => void;
  onSubmit?: () => void;
}

export default function OrderFormPopup({
  isOpen = false,
  onSubmit,
  onCloseClick,
  stateHandler = useState<Order>({
    ordererName: '',
    productId: '',
    amount: 0,
    contactPerson: '',
    notes: '',
    shippingAddress: {
      country: '',
      province: '',
      city: '',
      district: '',
      village: '',
      streetName: '',
    },
    _ui: {}
  }),
  ...props
}: Props) {
  const [order, , set] = useMappedState(
    stateHandler,
    propSetter =>
      (e: ChangeEvent<HTMLInputElement>) => propSetter(e.target.value),
  );
  const setShoppingAddress = useMemo(() => set('shippingAddress'), [order]);
  const [shippingAddress, , setShippingAddressProp] = useMappedState(
    order.shippingAddress,
    propSetter =>
      (e: ChangeEvent<HTMLInputElement>) => propSetter(e.target.value)
  );

  return (
    <ThePopup isOpen={isOpen} {...props}>
      <TheContainer>
        <button
          tw="cursor-pointer absolute top-0 right-0 m-1 p-1 text-blue-700 rounded-full focus:outline-none focus:bg-indigo-100 focus:text-white"
          onClick={() => onCloseClick?.()}
        >
          <HiX />
        </button>

        <form
          className="flex flex-col items-stretch"
          onSubmit={e => {
            e.preventDefault();
            setShoppingAddress.setVal(shippingAddress);
            fireCollection.order.add({
              ...order,
              _created: firebase.firestore.Timestamp.now(),
              _updated: firebase.firestore.Timestamp.now(),
              _deleted: null,
            })
              .then(() => {
                orderViaWhatsapp(order);
                onSubmit?.();
              });
          }}
        >
          <fieldset className="w-full p-6 flex flex-col items-stretch gap-y-3">
            <legend className="pt-2 font-semibold text-center text-2xl transform translate-y-1/4">Form pemesanan</legend>

            <TextInput
              placeholder="Nama pemesan"
              value={order.ordererName}
              onChange={set('ordererName')}
              required
            />

            <TextInput
              placeholder="Jumlah pemesanan"
              type="number"
              value={order.amount}
              onChange={set('amount')}
              required
            />

            {/* TODO: use api that provided in app/requests/indonesiaLocationDataRequest */}
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                placeholder="Provinsi"
                value={shippingAddress.province}
                onChange={setShippingAddressProp('province')}
                required
              />

              <TextInput
                placeholder="Kota/Kabupaten"
                value={shippingAddress.city}
                onChange={setShippingAddressProp('city')}
                required
              />

              <TextInput
                placeholder="Kecamatan"
                value={shippingAddress.district}
                onChange={setShippingAddressProp('district')}
                required
              />


              <TextInput
                placeholder="Kelurahan"
                value={shippingAddress.village}
                onChange={setShippingAddressProp('village')}
              />
            </div>

            <TextInput
              placeholder="Detail alamat (nama jalan, rt, rw, no rumah, dsb)"
            />

            <TextInput
              placeholder="Keterangan (Varian, dsb)"
              value={order.notes}
              onChange={set('notes')}
            />
          </fieldset>

          <TheSubmitButton type="submit">Pesan</TheSubmitButton>
        </form>
      </TheContainer>
    </ThePopup>
  );
};
