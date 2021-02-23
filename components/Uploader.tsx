import React, { Dispatch, SetStateAction, useImperativeHandle, useMemo, useState } from 'react';
import type fb from 'firebase'

type Props = {
  storageRef: fb.storage.Reference;
  handler?: [
    File[],
    Dispatch<SetStateAction<File[]>>,
  ];
  accept?: JSX.IntrinsicElements['input']['accept'];
};

const IMAGE_TYPES = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon'
];

export interface UploaderRef {
  upload: () => Promise<fb.storage.UploadTaskSnapshot[]>;
}

const Uploader = React.forwardRef<UploaderRef, Props>(({
  storageRef,
  handler: [val, setVal] = useState<File[]>([]),
  accept
}, ref) => {
  const previewList = useMemo(
    () => val.map(e => {
      const objUrl = URL.createObjectURL(e);

      return (
        <div key={e.name} className="w-full h-40 bg-white shadow flex flex-col justify-center">
          {IMAGE_TYPES.includes(e.type)
            && <img src={objUrl} className="h-32 object-cover" />}
          <a
            title={e.name}
            className="w-full text-center truncate hover:text-blue-500 hover:underline"
            href={objUrl}
            target="_blank"
          >
            {e.name}
          </a>
        </div>
      )
    }),
    [val],
  );
  const upload = function () {
    return Promise.all(val.map(i => storageRef.child(i.name).put(i)));
  };
  useImperativeHandle(ref, () => ({ upload }), [storageRef]);

  return (
    <div className="flex flex-col shadow-md">
      <div className="bg-gray-100 p-4 grid grid-cols-5 gap-4">
        {previewList}
      </div>

      <input
        type="file"
        accept={accept}
        onChange={e => setVal(Array.from(e.target.files ?? []))}
        multiple
        className="appearance-none"
      />

      <button onClick={upload}>Upload</button>
    </div>
  );
});

export default React.memo(Uploader);
