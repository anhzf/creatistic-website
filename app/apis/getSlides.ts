import { image } from 'faker';
import type { Slide } from 'components/Carousel';

const slides: Slide[] = [];

export default function getSlides(...imgOptions: Parameters<typeof image['imageUrl']>) {
  slides.slice(slides.length);
  slides.push(...Array.from(Array(10), () => ({ imgSrc: image.imageUrl(...imgOptions) })));
  return slides;
}
