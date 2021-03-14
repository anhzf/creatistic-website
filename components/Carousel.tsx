import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useState } from 'react';
import Image from 'next/image'
import tw, { styled } from 'twin.macro';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Container = tw.div`relative bg-gray-200 rounded-xl shadow-lg`;
const NavBtn = styled.button(() => [
  tw`absolute top-1/2 bottom-1/2 w-12 h-12 mx-1 sm:mx-2 md:mx-4 bg-gray-50 rounded-full ring-gray-500 ring-opacity-70 shadow-xl transform -translate-y-1/2 transition duration-200`,
  tw`font-bold text-center text-2xl leading-none`,
  tw`flex justify-center items-center`,
  tw`select-none overflow-hidden active:(scale-75) focus:(outline-none bg-gray-200 ring ring-inset)`,
]);

interface SlideContainerProps {
  active?: boolean;
  rounded?: boolean;
}

export interface Slide {
  src: string;
  isVideo?: boolean;
  rounded?: boolean;
  objectFit?: Parameters<typeof Image>[0]['objectFit'];
}

type SlideProps = HTMLAttributes<HTMLDivElement> & SlideContainerProps & Slide;

const SlideContainer = styled.div(({ active = false, rounded = false }: SlideContainerProps) => [
  tw`hidden relative w-full h-full rounded-xl`,
  active && tw`block`,
  rounded && tw`rounded-xl`
]);

const Slide = ({
  src,
  isVideo,
  rounded,
  objectFit,
  ...props
}: SlideProps) => (
  <SlideContainer {...props}>
    {isVideo ? (
      <video src={src} controls className={`w-full h-full ${rounded ? 'rounded-xl' : ''}`}>
        <span>Can't display media</span>
      </video>
    ) : (
      <Image
        src={src}
        layout="fill"
        loading="eager"
        objectFit={objectFit || 'cover'}
        className={rounded ? 'rounded-xl' : ''}
      />
    )}
  </SlideContainer>
);

interface Props extends HTMLAttributes<HTMLDivElement> {
  slides: Omit<SlideProps, 'rounded'>[];
  rounded?: Slide['rounded'];
  stateHandler?: [number, Dispatch<SetStateAction<number>>]
}

export default function Carousel({
  slides,
  stateHandler: [value, onValueChange] = useState(0),
  rounded = false,
  ...props
}: Props) {
  const toNextSlide = useCallback(
    () => onValueChange((value >= slides.length - 1) ? 0 : value + 1),
    [value, slides],
  );
  const toPrevSlide = useCallback(
    () => onValueChange((value <= 0) ? slides.length - 1 : value - 1),
    [value, slides],
  );

  return (
    <Container {...props}>
      <div className="overflow-hidden w-full h-full">
        {slides.map((e, i) => (
          <Slide
            key={i}
            active={i === value}
            className="animate__animated animate__zoomIn animate__faster"
            rounded={rounded}
            {...e}
          />
        ))}
      </div>

      <NavBtn className="left-0" onClick={toPrevSlide}>
        <HiChevronLeft />
      </NavBtn>

      <NavBtn className="right-0" onClick={toNextSlide}>
        <HiChevronRight />
      </NavBtn>
    </Container>
  );
}
