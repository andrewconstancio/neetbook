import { chakra, HTMLChakraProps, useColorModeValue, useToken, Heading } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = (props) => {
  const [white, black] = useToken('colors', ['white', 'gray.800'])
  return (
    <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
      {props.websitename}
    </Heading>
  )
}