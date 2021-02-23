import React from 'react';
import tw, { styled } from 'twin.macro';

interface Props {
  readonly flat?: boolean;
  readonly dense?: boolean;
}

const Chip = styled.div<Props>(({ flat, dense }) => [
  tw`bg-blue-500 font-semibold text-sm text-gray-700 rounded-full`,
  dense ? tw`px-2 py-1` : tw`px-4 py-2`,
  !flat && tw`shadow`,
]);

export default React.memo(Chip);
