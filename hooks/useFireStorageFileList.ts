import { useEffect, useState } from 'react';
import type fb from 'firebase';

export interface IStorageFile {
  url: string;
  metadata: Record<string, any>;
  fullPath: string;
}

export default function useFireStorageFileList(listRef: fb.storage.Reference) {
  const [list, setList] = useState<IStorageFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { items } = await listRef.listAll();

      Promise.all(
        items.map(async (item) => ({
          url: await item.getDownloadURL(),
          metadata: await item.getMetadata(),
          fullPath: item.fullPath,
        })),
      ).then((items) => {
        setLoading(false);
        setList(items);
      });
    })();
  }, []);

  return [list, loading] as const;
}