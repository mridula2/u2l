import React, { useState } from 'react'
import { Paragraph, Tab, Tabs, Box, Text } from 'grommet';
import LoginPageFooter from './Login/LoginPageFooter';
import LinksPage from './Login/LinksPage';

const AboutUs = () => {

  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box
      data-testid='AboutUsPage'>
      <Box height='300px' width='large' alignSelf='center'>
        <Text weight='bold' textAlign='start' pad="medium" margin='medium'>
          About U2L
        </Text>
        <Tabs activeIndex={index} onActive={onActive} justify="start">
          <Tab title="About Tool">
            {/* <TabContent> */}
            <Text margin="none" size='small' textAlign='justify' >
              1. HPE Code Assessment Suite is a code analysis tool which assesses
              applications written in Shell scripting, C, C++, Pro*C, Java and Java
              frameworks to track high level complexities in the code and report the changes
            </Text>
            <br />
            <br />
            <Text margin="none" size='small' textAlign='justify'>
              2. required to migrate the application from Unix-to-Linux or
              Linux-to-Linux platforms. It covers the overall assessment from the
              perspective of OS versions related issues, changes in commands and command
              options, JDK(versions) and compiler differences and related artifacts version
              differences, thus helping in optimizing and reduction in the code migration efforts
              and cost.
            </Text>
            {/* </TabContent> */}
          </Tab>
          <Tab title="Watch demo">
            <Paragraph margin="none">
              Demo Video
            </Paragraph>
            {/* <TabContent>Account Information</TabContent> */}
          </Tab>
        </Tabs>

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

export default AboutUs;