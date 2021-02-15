import tw, { styled } from 'twin.macro';

const ImageRowList = tw.div`relative w-full overflow-x-auto pt-2 flex flex-row flex-nowrap items-center gap-x-2`;

interface ItemProps {
  isActive?: boolean;
  noState?: boolean;
}

const Item = styled.div(({ isActive, noState = false }: ItemProps) => [
  tw`flex flex-col justify-center items-center transition-transform`,
  isActive ? tw`ring ring-gray-800 ring-offset-2 ring-offset-white transform scale-90` : (!noState && tw`opacity-80`),
]);

export default Object.assign(ImageRowList, {
  Item,

}) as typeof ImageRowList & {
  Item: typeof Item,

};

