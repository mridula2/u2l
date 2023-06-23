import React from 'react'
import { Box, Text } from 'grommet'
import LinksPage from './Login/LinksPage'
import { Link } from 'react-router-dom';
import LoginPageFooter from './Login/LoginPageFooter'

const Contact = () => {
  return (

    <Box
      data-testid='ContactPage'>
      <Box height='300px' width='large' alignSelf='center' border='fill' direction='row'>

        <Box>
          <Text weight='bold' textAlign='start' pad="medium" margin='medium' size='large'>
            Contact us
          </Text>
          <Box direction='row' gap='small' margin='small'>
            <Box> <Text weight='bold'>  Mail us </Text></Box>
            <Box >

              <Link to="/mridula@hpe.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                mridula@hpe.com
              </Link>

              <Link to="/divya@hpe.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                divya@hpe.com
              </Link>

              <Link to="/divya@hpe.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                Yuva@hpe.com
              </Link>
            </Box>
          </Box>
          {/* <Box direction='row' gap='small' margin='small'>
            <Box>
              <Text weight='bold' >
                Call us
              </Text>
            </Box>
            <Box >
              <Text style={{ textDecoration: 'underline' }} size='small'>0845 161 0050</Text>
            </Box>
          </Box> */}
        </Box>

        <Box margin={{ left: '10%' }}>
          <Text weight='bold' textAlign='start' size='large'>
            Write to us
          </Text>
          <Text>We will contact you</Text>
        </Box>


      </Box>
      <Box>
        <LinksPage />
      </Box>
      <Box>
        <LoginPageFooter />
      </Box>
    </Box>
  )
}

export default Contact
