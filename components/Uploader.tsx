import React, { useMemo, useState } from 'react';
import tw from 'twin.macro';
import { HiOutlinePlus } from 'react-icons/hi';
import { FILE_TYPES } from 'app/utils/file';
import useFireStorageFileList from 'hooks/useFireStorageFileList';
import type fb from 'firebase';
import Img from 'components/elements/Img';

interface IPreviewItem {
  url: string;
  fileName: string;
  fileType: string;
  isUploaded: boolean;
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
  const [files, setFiles] = useState<File[]>([]);
  const [storageFiles, storageFilesLoading] = useFireStorageFileList(storageRef);
  const previewItems = useMemo<IPreviewItem[]>(() => [
    ...storageFiles.map(file => ({
      url: file.url,
      fileName: file.metadata.name,
      fileType: file.metadata.contentType,
      isUploaded: true,
    })),
    ...files.map(item => ({
      url: URL.createObjectURL(item),
      fileName: item.name,
      fileType: item.type,
      isUploaded: false,
    })),
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
                onChange={e => setFiles(Array.from(e.target.files ?? []))}
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
