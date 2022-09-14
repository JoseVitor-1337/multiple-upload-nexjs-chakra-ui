import { ReactElement, useRef, useContext } from 'react'
import { Input, useToast } from '@chakra-ui/react'

import DropzoneContext from './Context'

export type IFile = {
  file: File
  name: string
  url: string
  size: number
  extension: string
}

type IDropzonesProviderProps = {
  children: ReactElement
  files?: IFile[]
  maxSize?: number
  acceptFiles?: string[]
  onUpload: (file: IFile[]) => Promise<void>
}

function DropzoneProvider({
  maxSize,
  acceptFiles,
  children,
  onUpload,
}: IDropzonesProviderProps) {
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const checkFileIsAccept = (fileExtension: string) => {
    if (!acceptFiles) return true

    return acceptFiles.includes(fileExtension.toUpperCase())
  }

  const checkFileSize = (filesize: number) => {
    if (!maxSize) return true

    return maxSize >= filesize
  }

  const verifyFileValidators = (file: IFile) => {
    const isFileAccept = checkFileIsAccept(file.extension)

    if (!isFileAccept) {
      toast({
        description: 'Extensão não permitida.',
        status: 'error',
        position: 'top-right',
      })

      return false
    }

    const isMaxSizeReach = checkFileSize(file.size)

    if (!isMaxSizeReach) {
      toast({
        description: 'Tamanho do arquivo excedito.',
        status: 'error',
        position: 'top-right',
      })

      return false
    }

    return true
  }

  const dispatchFileUpload = async (files: FileList) => {
    let formatedFiles = Array.from(files).map((file) => {
      const fileUrl = URL.createObjectURL(file)

      const splitedFilename = file.name.split('.')

      const formatedFile: IFile = {
        file,
        name: file.name,
        url: fileUrl,
        size: file.size,
        extension: splitedFilename[splitedFilename.length - 1],
      }

      return formatedFile
    })

    formatedFiles = formatedFiles.filter((file) => {
      return verifyFileValidators(file)
    })

    if (formatedFiles.length > 0) await onUpload(formatedFiles)
  }

  const dispatchInputClick = async () => {
    inputRef.current?.click()
  }

  return (
    <DropzoneContext.Provider
      value={{
        acceptFiles,
        maxSize,
        dispatchFileUpload,
        dispatchInputClick,
      }}
    >
      <Input
        ref={inputRef}
        type="file"
        onChange={(event) => {
          if (event.target.files) dispatchFileUpload(event.target.files)
        }}
        hidden
      />

      {children}
    </DropzoneContext.Provider>
  )
}

export default DropzoneProvider

export const useDropzone = () => useContext(DropzoneContext)
