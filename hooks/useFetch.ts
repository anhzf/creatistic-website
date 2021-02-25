import { useEffect, useState } from 'react';

export default function useFetch<T>(...args: Parameters<typeof fetch>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(...args);

        setData(await res.json());
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  return [
    data,
    error,
    loading,
  ] as const;
}
