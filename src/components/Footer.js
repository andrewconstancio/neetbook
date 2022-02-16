import { Box, Stack } from '@chakra-ui/react'
import * as React from 'react'
import { Copyright } from './Copyright'
import { Logo } from './Logo.js'
import { SocialMediaLinks } from './SocialMediaLinks'

const Footer = (props) => (
  <Box as="footer" bg="#161616" role="contentinfo" style={{bottom: "0px"}} py="12" px={{ base: '4', md: '8' }}>
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Logo webSiteName={props.webSiteName}  />
        <SocialMediaLinks />
      </Stack>
      <Copyright webSiteName={props.webSiteName}  alignSelf={{ base: 'center', sm: 'start' }} />
    </Stack>
  </Box>
)

export default Footer;