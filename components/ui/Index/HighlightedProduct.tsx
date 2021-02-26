import tw from 'twin.macro';

const HighlightedProduct = tw.div`relative w-full`;

const ImageContainer = tw.div`w-full h-80`;

const Caption = tw.div`absolute top-0 mx-4 sm:mx-10 my-6 flex flex-col items-baseline`;

const CaptionTitle = tw.h3`mt-4 font-mont text-5xl text-white lowercase`;

const CaptionSubtitle = tw.p`w-full max-w-lg my-1 font-medium text-white`;

const ActionBtn = tw.a`inline-block cursor-pointer mt-3 px-4 py-2 bg-white font-semibold text-sm text-blue-500 capitalize rounded-lg shadow hover:bg-gray-100 focus:outline-none focus:bg-gray-300`;

export default Object.assign(HighlightedProduct, {
  ImageContainer,
  Caption,
  CaptionTitle,
  CaptionSubtitle,
  ActionBtn,
}) as typeof HighlightedProduct & {
  Caption: typeof Caption;
  CaptionTitle: typeof CaptionTitle;
  CaptionSubtitle: typeof CaptionSubtitle;
  ImageContainer: typeof ImageContainer;
  ActionBtn: typeof ActionBtn;
}
