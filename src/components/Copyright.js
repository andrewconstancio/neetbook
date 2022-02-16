import { Text, TextProps } from '@chakra-ui/react'
import * as React from 'react'

export const Copyright = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} {props.webSiteName}, Inc. All rights reserved.
  </Text>
)