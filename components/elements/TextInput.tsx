import { Dispatch, SetStateAction } from 'react';
import 'twin.macro';

type acceptedValue = JSX.IntrinsicElements['input']['value'];

type Props = JSX.IntrinsicElements['input'] & {
  handler?: [acceptedValue, Dispatch<SetStateAction<acceptedValue>>];
}

const TextInput = ({ value, onChange, handler, ...props }: Props) => (
  // Prior to (value & onChange) than handler props
  <input
    value={value || (handler ? handler[0] : undefined)}
    onChange={onChange || handler ? (e => handler?.[1](e.target.value)) : undefined}
    tw="py-3 px-5 border-2 rounded-full placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70"
    {...props}
  />
);

export default TextInput;
