import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import { HiStar } from 'react-icons/hi';
import { ImWhatsapp } from 'react-icons/im';
import fireStorage from 'app/fireStorage';
import { docToServerProps, IDocToServerProps } from 'app/utils/firebase';
import { getProductByLink } from 'app/apis/getProduct';
import MainLayout from 'components/layouts/MainLayout';
import OrderFormPopup from 'components/ui/Product/OrderFormPopup';
import Carousel, { Slide } from 'components/Carousel'
import ImageRowList from 'components/ImageRowList';
import List from 'components/List';
import Chip from 'components/elements/Chip';
import useFireStorageFileList from 'hooks/useFireStorageFileList';
import { Order, Product as IProduct } from 'types/models';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
}

const Section = ({ title, children, ...props }: SectionProps) => (
  <section tw="w-full flex flex-col" {...props}>
    <h3 className="my-1 font-medium text-lg">{title}</h3>
    {children}
  </section>
);

const VariantChip = styled(Chip)<{ isActive?: boolean }>(({ isActive }) => [
  tw`cursor-pointer bg-blue-100 text-blue-400`,
  isActive && tw`bg-blue-100 text-blue-500 ring-2 ring-inset ring-blue-300`,
]);

interface ServerProps {
  product: IDocToServerProps<IProduct>;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({ params }) => {
  if (params) {
    const {
      name: productLink,
    } = params;
    const doc = await getProductByLink(productLink as string);

    if (doc) {
      return {
        props: {
          product: docToServerProps(doc),
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export default function Product({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [slideCursor, setSlideCursor] = useState(0);
  const [productMedia] = useFireStorageFileList(fireStorage.product.child(product.uid));
  const [slides, setSlides] = useState<Slide[]>([]);
  const [orderFormOpen, setOrderFormOpen] = useState(true);
  const [orderForm, setOrderForm] = useState<Order>({
    ordererName: '',
    productId: product.uid,
    amount: 1,
    contactPerson: '',
    notes: '',
    shippingAddress: {
      country: 'Indonesia',
      province: 'Jawa Tengah',
      city: 'Surakarta',
      district: '',
      village: '',
      streetName: '',
    },
    _ui: {
      productName: product.name,
    },
  });
  const productVariants = useMemo(
    () => productMedia.reduce(
      (acc, { metadata: { customMetadata } }) => customMetadata?.variantName
        ? [...acc, customMetadata.variantName]
        : acc,
      [] as string[],
    ),
    [productMedia]
  );

  useEffect(() => setSlides(productMedia.map(media => ({
    imgSrc: media.url,
  }))), [productMedia]);

  return (
    <MainLayout className="bg-gray-100 items-center">
      <header className="relative w-full max-w-screen-lg py-4 flex flex-col">
        <Carousel
          slides={slides}
          stateHandler={[slideCursor, setSlideCursor]}
          className="self-center w-full h-80 sm:h-96 rounded-md"
        />

        <ImageRowList>
          {productMedia.map((e, i) => (
            <ImageRowList.Item
              key={i}
              isActive={slideCursor === i}
              onClick={() => setSlideCursor(i)}
            >
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 animate-pulse">
                <span className="text-xs text-center text-red-400">Can't display media</span>
              </div>

              <Image
                src={e.url}
                width={200}
                height={120}
                layout="fixed"
                objectFit="cover"
              />

              {e.metadata.customMetadata?.variantName && (
                <VariantChip
                  flat
                  dense
                  tw="absolute top-0 right-0 m-1 bg-opacity-80 ring-0 hover:bg-opacity-100"
                >
                  {e.metadata.customMetadata.variantName}
                </VariantChip>
              )}
            </ImageRowList.Item>
          ))}
        </ImageRowList>
      </header>

      <div className="w-full max-w-screen-lg sm:p-6 bg-white sm:border-t border-gray-100 sm:rounded-md sm:shadow-md flex flex-col">
        <main className="px-4 pt-1 pb-16 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full sm:col-span-2">
            <h1 className="line-clamp-2 font-bold text-2xl capitalize">{product.name}</h1>
            <h2 className="font-bold text-lg text-blue-500">{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h2>

            <hr className="mt-4 h-1 bg-gray-900 bg-opacity-90 rounded-3xl" />
          </div>

          <span className="sm:col-span-2">{product.description}</span>

          <Section title="Spesifikasi Produk">
            <List>
              {Object.entries(product.specs).map(([k, v]) => (
                <List.Item key={`${product.uid}_specs:${k}`}>
                  <List.DT>{k}</List.DT>
                  <List.DD>{v}</List.DD>
                </List.Item>
              ))}

              <List.Item>
                <List.DT>Varian</List.DT>
                <List.DD css={[tw`flex flex-row gap-2`]}>
                  {productVariants.length
                    ? productVariants.map((e, i) => (
                      <VariantChip
                        key={i}
                        flat
                        dense
                      >
                        {e}
                      </VariantChip>
                    ))
                    : <span className="text-gray-400">tidak ada varian untuk produk ini 🙏</span>
                  }
                </List.DD>
              </List.Item>
            </List>
          </Section>

          <Section title="Informasi Penjualan">
            <List>
              <List.Item>
                <List.DT>Terjual</List.DT>
                <List.DD>{product._ui?.sold || 0} unit</List.DD>
              </List.Item>

              <List.Item>
                <List.DT>Rating</List.DT>
                <List.DD css={[tw`flex items-center gap-x-1`]}>
                  {Array.from(Array(5), (e, i) => (
                    <HiStar
                      key={i}
                      className={i < (product._ui?.rating || 0) ? 'text-yellow-400' : 'text-gray-400'}
                    />
                  ))}

                  <span className="ml-2 text-xs text-gray-500">{product._ui?.reviews || 0} review</span>
                </List.DD>
              </List.Item>
            </List>
          </Section>

          <Section title="Produk Serupa" className="sm:col-span-2">
            <ImageRowList className="py-2">
              {/* {productMedia.map((e, i) => (
                <ImageRowList.Item
                  key={i}
                  noState
                  className="w-40 rounded-md shadow-md"
                >
                  <Image
                    src={e.url}
                    width={200}
                    height={120}
                    objectFit="cover"
                    className="rounded-t-md"
                  />

                  <span className="self-start max-w-full px-3 py-1 text-sm text-gray-700 truncate">
                    <Link href="/">Dsadas das das ddasdsasddadasda</Link>
                  </span>
                </ImageRowList.Item>
              ))} */}
              <span className="w-full py-3 bg-gray-100 text-sm text-center text-gray-400 rounded-md">Tidak dapat menampilkan daftar 🙏</span>
            </ImageRowList>
          </Section>
        </main>

        <div className="sticky bottom-0 w-full px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 flex flex-col items-center">
          <nav className="relative max-w-5xl w-full py-2 border-t border-gray-300 grid grid-cols-3">
            <button
              className="py-2 font-semibold text-white bg-green-400 rounded-lg flex flex-nowrap justify-center items-center col-start-2 col-span-2"
              onClick={() => setOrderFormOpen(!orderFormOpen)}
            >
              <ImWhatsapp className="mr-4" />
              <span>Pesan sekarang</span>
            </button>
          </nav>

          <OrderFormPopup
            isOpen={orderFormOpen}
            stateHandler={[orderForm, setOrderForm]}
            tw="right-0"
            className="animate__animated animate__slideInUp"
            onCloseClick={() => setOrderFormOpen(false)}
            onSubmit={() => setOrderForm({
              ordererName: '',
              productId: product.uid,
              amount: 1,
              contactPerson: '',
              notes: '',
              shippingAddress: {
                country: 'Indonesia',
                province: 'Jawa Tengah',
                city: 'Surakarta',
                district: '',
                village: '',
                streetName: '',
              },
              _ui: {
                productName: product.name,
              },
            })}
          />
        </div>
      </div>
    </MainLayout>
  );
}
