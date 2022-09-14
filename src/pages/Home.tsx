import { useState } from 'react'
import { Flex } from '@chakra-ui/react'

import DropzoneProvider, { IFile } from 'pages/context/Dropzone/Provider'

import Card from './components/Card'
import Dropzone from './components/Dropzone'
import FileList from './components/FileList'

export default function Page() {
  const [files, setFiles] = useState<IFile[]>([])

  const handleUpload = async (newFiles: IFile[]) => {
    setFiles([...files, ...newFiles])
  }

  const acceptFiles = ['PDF', 'ZIP', 'RAR', 'JPG']
  const maxSize = 75000000000

  return (
    <DropzoneProvider
      maxSize={maxSize}
      acceptFiles={acceptFiles}
      onUpload={handleUpload}
    >
      <Flex
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        height="100vh"
      >
        <Card
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRightWidth={{ base: '1px', md: 'none' }}
          borderBottomWidth={{ base: 'none', md: '1px' }}
        >
          <Dropzone />
        </Card>

        <Card>
          <FileList setFiles={setFiles} files={files} />
        </Card>
      </Flex>
    </DropzoneProvider>
  )
}
