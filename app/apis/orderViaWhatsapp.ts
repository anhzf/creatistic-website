import { Order } from 'types/models';

const CONTACT_TARGET = '6282136961875';

export default function orderViaWhatsapp(order: Order) {
  const waApiUrl = new URL('http://wa.me/');
  waApiUrl.pathname = CONTACT_TARGET;
  waApiUrl.searchParams.append('text', `Salam Kreatif
  Halo min, saya pesan produk: ${order._ui.productName}#${order.productId}
  Varian: -
  Jumlah: ${order.amount}
  Nama Pemesan: ${order.ordererName}
  Alamat: ${order.shippingAddress}
  Nomor Hp: ${order.contactPerson || '-'}
  Keterangan: ${order.notes || '-'}`);

  window.open(waApiUrl.toString());
};
