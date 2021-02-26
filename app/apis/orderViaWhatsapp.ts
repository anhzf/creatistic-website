import { Order } from 'types/models';

const API_URL = 'http://wa.me/';
const CONTACT_TARGET = '6282136961875';

const newMessage = function () {
  let msg = '';

  return {
    addLine: function (text: string) {
      msg += msg ? `\n${text}` : text;
    },

    addRow: function (rowName: string, rowContent: any) {
      this.addLine(`${rowName}: ${rowContent || '-'}`);
    },

    toString() {
      return msg;
    }
  };
};

const shippingAddressToString = ({
  streetName,
  village,
  district,
  city,
  province,
  country
}: Order['shippingAddress']) => {
  const sortedShippingDetail = [
    streetName,
    village,
    district,
    city,
    province,
    country,
  ];

  return sortedShippingDetail.filter(Boolean).join(', ');
}

export default function orderViaWhatsapp(order: Order) {
  const waApiUrl = new URL(API_URL);
  const text = newMessage();

  text.addLine('Salam Kreatif,');
  text.addRow('Halo min, saya pesan produk', `${order._ui.productName}#${order.productId}`);
  text.addLine('');
  text.addRow('Varian', '-');
  text.addRow('Jumlah', order.amount);
  text.addRow('Nama Pemesan', order.ordererName);
  text.addRow('Alamat', shippingAddressToString(order.shippingAddress));
  text.addRow('Nomor HP', order.contactPerson);
  text.addRow('Keterangan', order.notes);

  waApiUrl.pathname = CONTACT_TARGET;
  waApiUrl.searchParams.append('text', text.toString());

  window.open(waApiUrl.toString());
};
