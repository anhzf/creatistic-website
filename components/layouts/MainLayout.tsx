import { HTMLAttributes } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Brand from 'components/Brand';
import tw from 'twin.macro';

const Container = tw.div`min-h-screen w-screen max-w-full flex flex-col`;
const Nav = tw.nav`w-full px-2 py-4 bg-white shadow-xl flex justify-center`;

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  desc?: string;
  metaUrl?: string;
}

export default function MainLayout({
  title = 'Creatistic Official Website - Mengabadikan Cinta Dalam Furnitur',
  desc = 'Menjawab kebutuhan furnitur anda, menciptakan cinta dalam furnitur. Memberikan anda suatu hal yang baru intuk kemajuan negri Indonesia melalui pengembangan UKM. Creatistic.id untuk Indonesia.',
  metaUrl = useRouter().pathname,
  className,
  children,
  ...props
}: Props) {
  const { basePath } = useRouter();

  return (
    <Container className={`dark ${className}`} {...props}>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <base href={basePath} />
        <meta name="title" content={title} />
        <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon" />
        <meta name="description" content={desc} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:image" content="/assets/logo creatistic.png" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content={metaUrl} />
        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="yRVHmDY9GNvr828pyT4AW_pb4NiRamy3mTdbVEucY2I" />
      </Head>

      <Nav>
        <h2 className="text-2xl"><Brand /></h2>
      </Nav>

      {children}

      <footer className="justify-self-end mt-auto bg-white dark:bg-gray-800 w-full py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between">
            <li className="my-2">
              <a
                href="#"
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                Products
              </a>
            </li>
            <li className="my-2">
              <a
                href="https://www.instagram.com/creatistic.id/"
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                Instagram
              </a>
            </li>
            <li className="my-2">
              <a
                href="https://www.tiktok.com/@creatistic.id"
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                TikTok
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                Facebook
              </a>
            </li>
          </ul>

          <div className="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
            <span>Copyright &copy; 2021 All rights reserved | <Link href="/">Creatistic.id</Link></span>
          </div>
        </div>
      </footer>
    </Container>
  )
}
