import tw, { styled } from 'twin.macro';

const Overlay = tw.div`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-60`;

const CloseButton = styled.button(() => [
  tw`fixed select-none top-4 right-4 w-12 h-12 bg-white font-bold text-center text-xl leading-none rounded-full ring-white ring-offset-2 ring-offset-gray-800`,
  tw`focus:(outline-none bg-gray-300 ring)`,
]);

export default Object.assign(Overlay, {
  CloseButton,

}) as typeof Overlay & {
  CloseButton: typeof CloseButton;
};
