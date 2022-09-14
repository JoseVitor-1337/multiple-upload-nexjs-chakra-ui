import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface ICardProps extends BoxProps {
  children: ReactElement
}

export default function Card({ children, ...rest }: ICardProps) {
  return (
    <Box
      maxHeight="500px"
      height={{ base: '100%', sm: '100%', md: '75%' }}
      width={{ base: '100%', sm: '100%', md: '75%' }}
      maxWidth="500px"
      borderWidth="1px"
      borderColor="borderColor"
      {...rest}
    >
      {children}
    </Box>
  )
}
