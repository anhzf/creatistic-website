import { HTMLAttributes } from 'react';
import tw from 'twin.macro';

interface Props extends HTMLAttributes<HTMLDivElement> {
}

const Container = tw.div`bg-white w-full max-w-2xl shadow overflow-hidden rounded-lg`;
const List = ({ children, ...props }: Props) => (
  <Container {...props}>
    <div tw="text-sm border-t border-gray-200">
      <dl>
        {children}
      </dl>
    </div>
  </Container>
);

const Item = tw.div`odd:bg-gray-50 even:bg-white px-4 py-5 grid grid-cols-3 sm:gap-4 sm:px-6`;
const DT = tw.dd`font-medium text-gray-500`;
const DD = tw.dd`text-gray-900 sm:mt-0 col-span-2`;

export default Object.assign(List, {
  Item,
  DT,
  DD,
}) as typeof List & {
  Item: typeof Item;
  DT: typeof DT;
  DD: typeof DD;
};
