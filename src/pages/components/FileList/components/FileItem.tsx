import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import {
  Icon,
  Image,
  Text,
  Progress,
  Stack,
  Flex,
  HStack,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react'

import Pdf from 'assets/icons/pdf.svg'
import Zip from 'assets/icons/zip.svg'
import Rar from 'assets/icons/rar.svg'
import Jpg from 'assets/icons/jpg.svg'
import { IFile } from 'pages/context/Dropzone/Provider'
import { IoMdClose } from 'react-icons/io'
import { BsCheckLg } from 'react-icons/bs'
import convertSizeNumberToBytes from 'utils/convertSizeNumberToBytes'

type IFileItemProps = {
  setFiles: Dispatch<SetStateAction<IFile[]>>
  file: IFile
}

interface IPossibleFileImage {
  [key: string]: string
}

export default function FileList({ file, setFiles }: IFileItemProps) {
  const [progress, setProgress] = useState(0)
  const [uploadProcess, setUploadProcess] = useState('uploading')

  const possiblesFileImage: IPossibleFileImage = useMemo(() => {
    return {
      pdf: Pdf.src,
      zip: Zip.src,
      rar: Rar.src,
      jpg: Jpg.src,
    }
  }, [])

  const progressBarColor = useMemo(() => {
    const possibleProgressBarColors: IPossibleFileImage = {
      finished: 'green',
      uploading: 'blue',
    }

    return possibleProgressBarColors[uploadProcess]
  }, [uploadProcess])

  const closeIconColor = useColorModeValue('red.500', 'red.400')
  const checkIconColor = useColorModeValue('green.500', 'green.400')
  const textColor = useColorModeValue('gray.400', 'gray700')

  const xhr = new XMLHttpRequest()

  const cancelUpload = () => {
    xhr.abort()
    setFiles((oldFiles) => {
      return oldFiles.filter((oldFile) => oldFile.name !== file.name)
    })
  }

  useEffect(() => {
    xhr.open('GET', file.url)

    xhr.onprogress = function (event) {
      const fileLoad = Number((event.loaded / event.total) * 100)

      setProgress(fileLoad)
    }

    xhr.onloadstart = function () {
      setUploadProcess('uploading')
    }

    xhr.onloadend = function () {
      if (xhr.readyState !== 0) setUploadProcess('finished')
    }

    xhr.onabort = function (event) {
      setProgress(0)
      console.log('Abort', event)
    }

    xhr.send()

    return () => {
      xhr.abort()
    }
  }, [])

  return (
    <ListItem px={2} mb={4}>
      <Flex key={file.name} gap={2}>
        <Image src={possiblesFileImage[file.extension]} boxSize="50px" />

        <Stack width="100%" spacing={4}>
          <HStack width="100%" justify="space-between">
            <Text
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              maxWidth="250px"
            >
              {file.name}
            </Text>

            <HStack align="center" justify="center">
              <Text color={textColor}>
                {convertSizeNumberToBytes(file.size)},{' '}
                {file.extension.toUpperCase()}
              </Text>

              {uploadProcess === 'finished' && (
                <Icon as={BsCheckLg} boxSize={5} color={checkIconColor} />
              )}

              {uploadProcess === 'uploading' && (
                <Icon
                  onClick={cancelUpload}
                  onKeyPress={cancelUpload}
                  tabIndex={0}
                  transition="all 250ms"
                  cursor="pointer"
                  as={IoMdClose}
                  boxSize={6}
                  color={closeIconColor}
                  _hover={{ transform: 'scale(1.2)', opacity: 0.9 }}
                  _focus={{ outlineColor: closeIconColor }}
                />
              )}
            </HStack>
          </HStack>

          <Progress
            size="sm"
            colorScheme={progressBarColor}
            value={progress}
            rounded="lg"
          />
        </Stack>
      </Flex>
    </ListItem>
  )
}
