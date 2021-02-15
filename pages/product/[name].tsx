import { useEffect, useState } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import { HiStar, HiShoppingCart } from 'react-icons/hi';
import getSlides from 'app/apis/getSlides';
import MainLayout from 'components/layouts/MainLayout';
import Carousel, { Slide } from 'components/Carousel'
import ImageRowList from 'components/ImageRowList';
import List from 'components/List';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}

const Section = ({ title, children, ...props }: SectionProps) => (
  <section tw="w-full flex flex-col" {...props}>
    <h3 className="my-1 font-medium text-lg">{title}</h3>
    {children}
  </section>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: {
    productName: params?.name as string,
    slideImages: getSlides(200, 120),
  },
});

export default function Product({ productName, slideImages }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [slideCursor, setSlideCursor] = useState(0);
  const [slides] = useState<Slide[]>(slideImages);

  return (
    <MainLayout className="items-center">
      <header className="relative w-full max-w-screen-lg py-4 flex flex-col">
        <Carousel
          slides={slides}
          stateHandler={[slideCursor, setSlideCursor]}
          className="self-center w-full h-80 sm:h-96 rounded-md"
        />

        <ImageRowList>
          {slides.map((e, i) => (
            <ImageRowList.Item
              key={i}
              isActive={slideCursor === i}
              onClick={() => setSlideCursor(i)}
            >
              <Image
                src={e.imgSrc}
                width={200}
                height={120}
                layout="fixed"
                objectFit="cover"
              />
            </ImageRowList.Item>
          ))}
        </ImageRowList>
      </header>

      <div className="w-full max-w-screen-lg sm:p-6 sm:border-t border-gray-100 sm:rounded-md sm:shadow-md flex flex-col">
        <main className="px-4 pt-1 pb-16 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full sm:col-span-2">
            <h1 className="line-clamp-2 font-bold text-2xl capitalize">{productName}</h1>
            <h2 className="font-bold text-lg text-blue-500">Rp 100.000</h2>

            <hr className="mt-4 h-1 bg-gray-900 bg-opacity-90 rounded-3xl" />
          </div>

          <span className="sm:col-span-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quis suscipit iusto commodi voluptatibus ipsum dolorum deserunt quisquam sed, perspiciatis unde neque labore placeat hic minus laudantium eius expedita repellat!</span>

          <Section title="Spesifikasi Produk">
            <List>
              <List.Item>
                <List.DT>Bahan</List.DT>
                <List.DD>Kayu</List.DD>
              </List.Item>

              <List.Item>
                <List.DT>Ukuran</List.DT>
                <List.DD>65 mm</List.DD>
              </List.Item>

              <List.Item>
                <List.DT>Dikirim dari</List.DT>
                <List.DD>Solo</List.DD>
              </List.Item>

              <List.Item>
                <List.DT>Varian</List.DT>
                <List.DD tw="flex flex-row gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full ring-2 ring-gray-700 ring-offset-2 ring-offset-white" />
                  <div className="w-8 h-8 bg-yellow-800 rounded-full" />
                  <div className="w-8 h-8 bg-pink-500 rounded-full" />
                </List.DD>
              </List.Item>
            </List>
          </Section>

          <Section title="Informasi Penjualan">
            <List>
              <List.Item>
                <List.DT>Terjual</List.DT>
                <List.DD>1021 unit</List.DD>
              </List.Item>

              <List.Item>
                <List.DT>Rating</List.DT>
                <List.DD tw="flex items-center gap-x-1">
                  <HiStar className="text-yellow-400" />
                  <HiStar className="text-yellow-400" />
                  <HiStar className="text-yellow-400" />
                  <HiStar className="text-yellow-400" />
                  <HiStar className="text-gray-400" />

                  <span className="ml-2 text-xs text-gray-500">112 review</span>
                </List.DD>
              </List.Item>
            </List>
          </Section>

          <Section title="Produk Serupa" className="sm:col-span-2">
            <ImageRowList className="py-2">
              {slides.map((e, i) => (
                <ImageRowList.Item
                  key={i}
                  noState
                  className="w-40 rounded-md shadow-md"
                >
                  <Image
                    src={e.imgSrc}
                    width={200}
                    height={120}
                    objectFit="cover"
                    className="rounded-t-md"
                  />

                  <span className="self-start max-w-full px-3 py-1 text-sm text-gray-700 truncate">
                    <Link href="#">Dsadas das das ddasdsasddadasda</Link>
                  </span>
                </ImageRowList.Item>
              ))}
            </ImageRowList>
          </Section>
        </main>

        <div className="sticky bottom-0 w-full px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 flex flex-col items-center">
          <nav className="max-w-5xl w-full py-4 border-t border-gray-300 divide-x divide-gray-500 grid grid-cols-3">
            <button className="font-semibold text-blue-500 flex flex-nowrap justify-center items-center col-start-2 col-span-2">
              <HiShoppingCart className="mr-4" />
              <span>Tambahkan ke Keranjang</span>
            </button>
          </nav>
        </div>
      </div>
    </MainLayout >
  );
}
