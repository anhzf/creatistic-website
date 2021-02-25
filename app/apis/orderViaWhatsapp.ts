export default function orderViaWhatsapp(productId: string, productName: string) {
  const waApiUrl = new URL('http://wa.me/');
  waApiUrl.pathname = '6282136961875';
  waApiUrl.searchParams.append('text', `Halo min, saya pesan ${productName}#${productId}!`);

  window.open(waApiUrl.toString());
};
