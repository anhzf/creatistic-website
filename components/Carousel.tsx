import { useCallback, useEffect, useState } from 'react';
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
}

export interface Slide {
  imgSrc: string;
}

type SlideProps = React.HTMLAttributes<HTMLDivElement> & SlideContainerProps & Slide;

const SlideContainer = styled.div(({ active = false }: SlideContainerProps) => [
  tw`hidden relative w-full h-full rounded-xl`,
  active && tw`block`,
]);

const Slide = function ({ imgSrc, ...props }: SlideProps) {
  return (
    <SlideContainer {...props}>
      <Image
        src={imgSrc}
        layout="fill"
        loading="eager"
        objectFit="cover"
        className="rounded-xl"
      />
    </SlideContainer>
  )
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  slides: SlideProps[];
}

export default function Carousel({
  slides,
  ...props
}: Props) {
  const [activeSlide, setActiveSlide] = useState(-1);
  const toNextSlide = useCallback(
    () => setActiveSlide((activeSlide >= slides.length - 1) ? 0 : activeSlide + 1),
    [activeSlide, slides],
  );
  const toPrevSlide = useCallback(
    () => setActiveSlide((activeSlide <= 0) ? slides.length - 1 : activeSlide - 1),
    [activeSlide, slides],
  );

  useEffect(() => {
    setTimeout(() => setActiveSlide(0), 300);
  }, []);

  return (
    <Container {...props}>
      <div className="overflow-hidden w-full h-full">
        {slides.map((e, i) => (
          <Slide
            key={i}
            active={i === activeSlide}
            className="animate__animated animate__zoomIn animate__faster"
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
