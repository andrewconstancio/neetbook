import { chakra, HTMLChakraProps, useColorModeValue, useToken, Heading } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = ( {websitename }) => {
  return (
    <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
      {websitename}
    </Heading>
  )
}