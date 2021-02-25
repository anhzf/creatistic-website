import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type PropSetter<T extends {}> = (val: T[keyof T]) => void;

export default function useMappedState<
  T extends {},
  TSetterTransformerArgs extends Array<unknown> = Array<unknown>,
>(
  initialValue: T | [T, Dispatch<SetStateAction<T>>],
  setterTransformer?: (propSetter: PropSetter<T>) => (...args: TSetterTransformerArgs) => void
) {
  const [state, setState] = Array.isArray(initialValue) ? initialValue : useState(initialValue);

  const setter = useCallback(
    ((keyName: keyof T) => {
      const propSetter: PropSetter<T> = val => setState({
        ...state,
        [keyName]: val,
      });
      const finalSetter = (setterTransformer?.(propSetter) || propSetter) as
          (typeof setterTransformer extends undefined
            ? PropSetter<T>
            : ReturnType<NonNullable<typeof setterTransformer>>);

      return Object.assign(finalSetter, {
        setVal: propSetter,
      });
    }),
    [state],
  );

  return [
    state,
    setState,
    setter,
  ] as const;
};
