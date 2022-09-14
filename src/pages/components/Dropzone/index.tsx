import { DragEvent, useState, memo } from 'react'
import {
  VStack,
  Center,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { BiCloudUpload } from 'react-icons/bi'

import convertSizeNumberToBytes from 'utils/convertSizeNumberToBytes'
import { useDropzone } from 'pages/context/Dropzone/Provider'

function Dropzone() {
  const { acceptFiles, maxSize, dispatchFileUpload, dispatchInputClick } =
    useDropzone()

  const [dragFileEnter, setDragFileEnter] = useState(false)

  const blueColor = useColorModeValue('blue.400', 'blue.800')

  const onDrop = async (event: DragEvent) => {
    setDragFileEnter(false)

    if (event.dataTransfer && event.dataTransfer.files.length != 0) {
      await dispatchFileUpload(event.dataTransfer.files)
    }

    event.preventDefault()
  }

  return (
    <Center
      draggable="true"
      onDragEnter={() => setDragFileEnter(true)}
      onDragLeave={() => setDragFileEnter(false)}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={onDrop}
      onClick={dispatchInputClick}
      onKeyPress={dispatchInputClick}
      transition="all 250ms"
      tabIndex={0}
      cursor="pointer"
      rounded="sm"
      border="2px dashed"
      borderColor={dragFileEnter ? blueColor : 'borderColor'}
      height={{ base: '95%', sm: '85%', md: '75%' }}
      width={{ base: '95%', sm: '85%', md: '75%' }}
      color={dragFileEnter ? blueColor : 'black'}
      _hover={{ color: blueColor, borderColor: blueColor }}
      _focus={{
        outlineColor: blueColor,
        color: blueColor,
        borderColor: blueColor,
      }}
    >
      <VStack zIndex={-1}>
        <BiCloudUpload size="150px" />
        <VStack>
          <Heading fontWeight="500" as="h1" textAlign="center" size="md">
            {dragFileEnter ? 'Soltar arquivo' : 'Clique ou arraste um arquivo'}
          </Heading>

          <VStack spacing={0}>
            {maxSize && (
              <Text color="black" fontSize="sm">
                Tamanho máximo dos arquivos: {convertSizeNumberToBytes(maxSize)}
              </Text>
            )}
            {acceptFiles && (
              <Text color="gray.400" fontSize="sm">
                {acceptFiles.join(', ')}
              </Text>
            )}
          </VStack>
        </VStack>
      </VStack>
    </Center>
  )
}

export default memo(Dropzone)
