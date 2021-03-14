import { ReactNode, useState } from 'react';

type Props = Omit<JSX.IntrinsicElements['img'], 'loading'> & {
  placeholder?: ReactNode;
}

export default function Img({
  className = '',
  placeholder,
  children,
  ...props
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isValid, setIsValid] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <img
        className="absolute top-0 w-full h-full object-cover"
        onLoadStart={() => setIsLoaded(false)}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsValid(false)}
        loading="lazy"
        {...props}
      />

      {!isLoaded && (
        placeholder || <div className="absolute top-0 w-full h-full bg-gray-300 rounded-lg animate-pulse" />
      )}

      {!isValid && (
        <span className="absolute w-full h-full text-xs text-center text-red-500">Can't display image</span>
      )}

      {children}
    </div>
  )
}
