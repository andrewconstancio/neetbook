import { chakra, HTMLChakraProps, useColorModeValue, useToken, Heading } from '@chakra-ui/react'
import * as React from 'react'
import LogoImg from '../images/PROJECT_S_LOGO_V3.svg'

const LogoSmall = ( {websitename }) => {
  return (
    <>
      <img src={LogoImg} />
    </>
  )
}

export default LogoSmall;