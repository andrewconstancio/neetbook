import { chakra, HTMLChakraProps, useColorModeValue, useToken, Heading } from '@chakra-ui/react'
import * as React from 'react'
import LogoImg from '../images/PROJECT_v2.png'

export const Logo = ( {websitename }) => {
  return (
    <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
      <img src={LogoImg} />
    </Heading>
  )
}