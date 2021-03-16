import React, { useMemo, useState, useCallback } from 'react';
import tw from 'twin.macro';
import { HiOutlinePlus, HiTrash } from 'react-icons/hi';
import { FILE_TYPES } from 'app/utils/file';
import useFireStorageFileList from 'hooks/useFireStorageFileList';
import Img from 'components/elements/Img';
import type fb from 'firebase';
import { fbs } from 'app/services/firebaseClient';

interface IPreviewItem {
  url: string;
  fileName: string;
  fileType: string;
  pathRef: string;
  uploadTask?: fb.storage.UploadTask;
}

const PreviewItem = tw.div`relative w-full h-40 bg-white shadow flex flex-col justify-center`;

type Props = {
  storageRef: fb.storage.Reference;
  accept?: JSX.IntrinsicElements['input']['accept'];
};

const Uploader = function ({
  storageRef,
  accept
}: Props) {
  const fileInputId = Date.now().toString();
  const [files, setFiles] = useState<IPreviewItem[]>([]);
  const [storageFiles, storageFilesLoading, updateStorageFiles] = useFireStorageFileList(storageRef);
  const pushFiles = useCallback(
    (...filePayload: File[]) => setFiles([
      ...files,
      ...filePayload.map(file => {
        const ref = storageRef.child(file.name);

        return {
          url: URL.createObjectURL(file),
          fileName: file.name,
          fileType: file.type,
          uploadTask: ref.put(file),
          pathRef: ref.fullPath,
        };
      }),
    ]),
    [storageRef, files],
  );
  const previewItems = useMemo<IPreviewItem[]>(() => [
    ...storageFiles.map(snapshot => ({
      url: snapshot.url,
      fileName: snapshot.metadata.name,
      fileType: snapshot.metadata.contentType,
      pathRef: snapshot.fullPath,
    } as IPreviewItem)),
    ...files,
  ], [storageFiles, files]);

  return (
    <div className="flex flex-col shadow-md">
      <div className={`p-4 grid grid-cols-5 gap-4 ${storageFilesLoading ? 'bg-blue-gray-300 animate-pulse' : 'bg-gray-100'}`}>
        {previewItems.map(el => (
          <PreviewItem key={el.fileName}>
            {FILE_TYPES.image.includes(el.fileType)
              && <Img src={el.url} className="h-32 object-cover" />}
            <a
              title={el.fileName}
              className="w-full text-center truncate hover:text-blue-500 hover:underline"
              href={el.url}
              target="_blank"
            >
              {el.fileName}
            </a>

            <button
              className="absolute top-0 right-0 m-2"
              onClick={() => fbs.storage.ref(el.pathRef).delete().then(updateStorageFiles)}
            >
              <HiTrash className="text-red-500" />
            </button>
          </PreviewItem>
        ))}

        {storageFilesLoading ?
          <span>Loading files...</span>
          : (
            <label htmlFor={fileInputId} role="button" className="cursor-pointer relative w-full h-40 bg-white shadow flex flex-col justify-center items-center">
              <HiOutlinePlus className="text-5xl text-gray-300" />
              <input
                id={fileInputId}
                type="file"
                accept={accept}
                onChange={e => pushFiles(...Array.from(e.target.files ?? []))}
                multiple
                className="absolute top-0 left-0 opacity-0"
              />
            </label>
          )
        }
      </div>
    </div>
  );
};

export default React.memo(Uploader);
