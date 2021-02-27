import React from 'react';
import tw, { styled } from 'twin.macro';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';

const Container = tw.div`relative overflow-hidden w-full`;

const ImageContainer = tw.div`w-full h-80 transform transition-transform group-hover:scale-110`;

const Caption = styled.div<{ right?: boolean }>(({ right }) => [
  tw`absolute top-0 mx-4 sm:mx-10 my-6 flex flex-col items-baseline`,
  right && tw`right-0 items-end text-right`,
]);

const CaptionTitle = tw.h3`mt-4 font-mont text-5xl text-white line-clamp-1 lowercase`;

const CaptionSubtitle = tw.p`w-full max-w-lg my-1 font-medium text-white line-clamp-3`;

const ActionBtn = tw.a`inline-block cursor-pointer mt-3 px-4 py-2 bg-white font-semibold text-sm text-blue-500 capitalize rounded-lg shadow hover:bg-gray-100 focus:outline-none focus:bg-gray-300`;

export const component = Object.assign(Container, {
  ImageContainer,
  Caption,
  CaptionTitle,
  CaptionSubtitle,
  ActionBtn,
}) as typeof Container & {
  Caption: typeof Caption;
  CaptionTitle: typeof CaptionTitle;
  CaptionSubtitle: typeof CaptionSubtitle;
  ImageContainer: typeof ImageContainer;
  ActionBtn: typeof ActionBtn;
}

interface Props {
  title: string;
  description: string;
  imgSrc: string;
  href: LinkProps['href'];
  right?: boolean;
}

export default function HighlightedProduct({ title, description, imgSrc, href, right }: Props) {
  return (
    <Container className="group">
      <ImageContainer>
        <Image
          src={imgSrc}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>

      <Caption right={right}>
        <CaptionTitle>
          {title}
        </CaptionTitle>

        <CaptionSubtitle>
          {description}
        </CaptionSubtitle>

        <Link href={href} shallow>
          <ActionBtn>
            Lihat detail
          </ActionBtn>
        </Link>

      </Caption>
    </Container>

  )
}
