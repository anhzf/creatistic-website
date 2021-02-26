import tw from 'twin.macro';

type OptionProps = JSX.IntrinsicElements['option'];

const Option = ({ value, ...props }: OptionProps) => (
  <option value={value} {...props}>
    {value}
  </option>
);

const Container = tw.select`w-full text-gray-700 py-3 px-5 border-2 bg-white rounded-full shadow-sm placeholder-gray-500 focus:(outline-none ring-4 ring-blue-500 ring-opacity-70)`;

type Props = JSX.IntrinsicElements['select'] & {
  options?: Array<string | number>;
  disableFirstOption?: boolean;
}

export default function Select({
  value = '',
  options = [],
  disableFirstOption = true,
  ...props
}: Props) {

  return (
    <Container {...props}>
      {options.map((option, i) => (
        <Option
          key={option}
          value={option}
          disabled={disableFirstOption && (i === 0)}
        >
          {option}
        </Option>
      ))}
    </Container>
  );
};
