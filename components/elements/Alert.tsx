import { createRef, HTMLAttributes, useEffect } from 'react';
import tw from 'twin.macro';

const Container = tw.div`fixed bottom-0 left-0 w-full p-6 bg-white`;

interface Props extends HTMLAttributes<HTMLDivElement> {
  timeout?: number;
}

export default function Alert({ className, children, timeout = 10000, ...props }: Props) {
  const el = createRef<HTMLDivElement>();
  const APPEAR_CLASS = 'animate__slideInUp';
  const DISAPPER_CLASS = 'animate__slideOutDown';

  useEffect(() => {
    el.current?.classList.add(APPEAR_CLASS);
    setTimeout(() => {
      el.current?.classList.remove(APPEAR_CLASS);
      el.current?.classList.add(DISAPPER_CLASS);
    }, timeout);
  }, []);

  return (
    <Container ref={el} className={`animate__animated ${className}`} {...props}>
      {children}
    </Container>
  )
}
