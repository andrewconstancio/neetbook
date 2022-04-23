import * as React from 'react'
// import LogoImg from '../images/PROJECT_v2.png'
import LogoImg from '../images/project_s_logo_v7.svg'
import {
  Image
} from "@chakra-ui/react"

export const Logo = ( {websitename }) => {
  return (
    <>
      <Image w="270px" src={LogoImg} />
    </>
  )
}