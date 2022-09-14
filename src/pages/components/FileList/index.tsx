import { Dispatch, SetStateAction } from 'react'
import { VStack, Heading, List } from '@chakra-ui/react'

import { IFile } from 'pages/context/Dropzone/Provider'

interface IFileListProps {
  setFiles: Dispatch<SetStateAction<IFile[]>>
  files: IFile[]
}

import FileItem from './components/FileItem'

export default function FileList({ files, setFiles }: IFileListProps) {
  return (
    <VStack py={6} px={2} spacing={8}>
      <Heading fontWeight={500} size="md">
        Arquivos
      </Heading>

      <List width="100%" p={0}>
        {files.map((file) => (
          <FileItem key={file.name} setFiles={setFiles} file={file} />
        ))}
      </List>
    </VStack>
  )
}
