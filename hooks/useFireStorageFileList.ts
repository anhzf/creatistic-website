import { useEffect, useState, useCallback } from 'react';
import type fb from 'firebase';

export interface IStorageFile {
  url: string;
  metadata: Record<string, any>;
  fullPath: string;
}

export default function useFireStorageFileList(listRef: fb.storage.Reference) {
  const [list, setList] = useState<IStorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const update = useCallback(
    async () => {
      setLoading(true);
      const { items } = await listRef.listAll();

      setList(await Promise.all(
        items.map(async (item) => ({
          url: await item.getDownloadURL(),
          metadata: await item.getMetadata(),
          fullPath: item.fullPath,
        })),
      ));
      setLoading(false);
    },
    [listRef],
  )

  useEffect(() => {
    update();
  }, []);

  return [list, loading, update] as const;
}
