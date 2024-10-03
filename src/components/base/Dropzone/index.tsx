import React, { useCallback, useRef, useEffect, useState } from 'react'
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { FileWithPreview, DropzoneComponentProps } from '@/types/models'
import Image from 'next/image'

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  acceptedTypes,
  message,
  fileInputRef,
  hideUploadButton,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const internalRef = useRef<HTMLInputElement>(null)
  const usedRef = fileInputRef || internalRef

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => {
      const mappedFiles = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })) as FileWithPreview[]
      setFiles(mappedFiles)
    },
    [],
  )

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize: 1024 * 1024 * 5, // 5MB
    maxFiles: 3,
  })

  const openFileSelector = () => {
    usedRef.current?.click()
  }

  const fileList = files.map((file) => (
    <li key={file.name}>
      <Image
        className="m-auto max-h-full max-w-full rounded-sm"
        src={file.preview}
        alt={file.name}
      />
      <span className="mt-2 flex text-sm">{file.name}</span>
    </li>
  ))

  return (
    <div>
      <div
        {...getRootProps({
          onClick: openFileSelector,
        })}
        className={`bg-fafafa text-bdbdbd transition-border mt-8 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-5 outline-none duration-200 ease-in-out ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} ref={usedRef} />
        {files.length === 0 && (
          <p className="m-0 text-center text-base font-semibold">{message}</p>
        )}
        <ul>{fileList}</ul>
      </div>
      {/* TO-DO: USE INTERNAL BUTTON COMPONENT */}
      {!hideUploadButton && (
        <button
          onClick={openFileSelector}
          className="your-upload-button-classes"
        >
          Upload File
        </button>
      )}
    </div>
  )
}

export default DropzoneComponent
