import { extendTheme } from '@chakra-ui/react'

const customTheme = {
  fonts: { body: 'Poppins', heading: 'Poppins' },
  semanticTokens: {
    colors: {
      borderColor: {
        default: 'gray.200',
        _dark: 'gray.600',
      },
    },
  },
}

const newTheme = extendTheme(customTheme)

export default newTheme
