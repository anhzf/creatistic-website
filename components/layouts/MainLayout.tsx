import Brand from 'components/Brand';
import Head from 'next/head';
import { useRouter } from 'next/router'
import tw from 'twin.macro';

const Container = tw.div`min-h-screen w-screen max-w-full flex flex-col`;
const Nav = tw.nav`w-full px-2 py-4 bg-white shadow-xl flex justify-center`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  desc?: string;
  metaUrl?: string;
}

export default function MainLayout({
  title = 'Creatistic Official Website - Mengabadikan Cinta Dalam Furnitur',
  desc = 'Menjawab kebutuhan furnitur anda, menciptakan cinta dalam furnitur. Memberikan anda suatu hal yang baru intuk kemajuan negri Indonesia melalui pengembangan UKM. Creatistic.id untuk Indonesia.',
  metaUrl = useRouter().pathname,
  children,
  ...props
}: Props) {
  return (
    <Container {...props}>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon"/>
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
    </Container>
  )
}
