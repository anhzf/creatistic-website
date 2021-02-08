import type { Slide } from 'components/Carousel';
import { random } from 'faker';

const slides: Slide[] = [];

export default function getSlides() {
  slides.slice(slides.length);
  slides.push(...Array.from(Array(10), () => ({ imgSrc: random.image() })));
  return slides;
}
