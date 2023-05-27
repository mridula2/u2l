import React, { useState } from 'react';
import {
  Tab,
  Tabs,
  Text,
  Form,
  Box,
  FormField,
  TextInput,
  Button,
} from 'grommet';
import { Search, Projects, System } from 'grommet-icons';
import { useLocation } from 'react-router-dom';
const Review = () => {
  const [index, setIndex] = useState();
  const onActive = (nextIndex) => setIndex(nextIndex);
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const location =useLocation()
  function handleChange(event) { 
    setNameInput(event.target.value);
  }

  function handleChange1(event) {
    setPasswordInput(event.target.value);
  }

  function handleChange2(event) {
    setEmailInput(event.target.value);
  }

  return (
    <Form>
      <Box>
      <Box direction="row-responsive" responsive={true} flex="shrink">
        <Box direction="column" width="small" responsive={true} height="91vh">
          <Button
            label="Code Assessment"
            href="/dashboard"
            style={styles.btn}
          />
          <Button
            label="Project Details"
            // href="/projectdeatils"
            style={styles.btn}
            disabled={true}
          />
          <Button
            label="OS Details"
            id="os_details"
            // onClick={(event) => handleTabs(event)}
            style={styles.btn}
            disabled={true}
          />
          <Button
            label="Analysis Type"
            id="analysis_type"
            // onClick={(event) => handleTabs(event)}
            style={styles.btn}
            disabled={true}
          />
          <Button label="Review" style={styles.btn} />
          <Button
            margin={{ left: 'small' }}
            label="Review and Create"
            href="/review"
            style={styles.btn}
          />
        </Box>
        <Box
          style={{ alignContent: 'center' }}
          margin={{ top: 'medium', left: 'auto', right: 'auto' }}
        >
          <Tabs
            activeIndex={index}
            onActive={onActive}
            justify="center"
            margin={{ top: 'medium', left: 'auto', right: 'auto' }}
          >
            {/* ------------ Tab 1 ----------------*/}
            <Tab title="Project Details" icon={<Projects />}>
              {/* <Text>Name Information</Text> */}
              <Box gap="medium" margin={{ top: 'large' }}>
                <Text>
                  Project name:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                    {location.state.formValues.project_name}
                  </Text>
                </Text>

                <Text>
                  Project client:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.project_client}
                  </Text>
                </Text>

                <Text>
                  Project manager:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.project_manager}
                  </Text>
                </Text>

                <Text>
                  Application name:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.application_name}
                  </Text>
                </Text>
              
              </Box>
            </Tab>

            {/* ------------ Tab 2 ----------------*/}
            <Tab title="OS Details" icon={<System />}>
              {/* <Text>Account Information</Text> */}
              <Box gap="medium" margin={{ top: 'large' }}>
                <Text>
                  Source OS:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.source_os}
                  </Text>
                </Text>

                <Text>
                  Source OS Version:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.source_os_version}
                    </Text>
                </Text>
                <Text>
                  Target OS:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.target_os}
                  </Text>
                </Text>

                <Text>
                  Target OS Version:
                  <Text weight="bold" margin={{ left: 'medium' }}>
                  {location.state.formValues.target_os_version}
                  </Text>
                </Text>
              </Box>
            </Tab>

            {/* ------------ Tab 3 ----------------*/}
            <Tab title="Analysis Type" icon={<Search />}>
              {/* <Text>Billing Information</Text> */}
              <Box gap="medium" align="center" margin={{ top: 'large' }}>
                <Button
                  label="Table"
                  primary
                  type="submit"
                  href="/filteringtable"
                />
                <Button
                  label="Dashboard"
                  primary
                  type="submit"
                  href="/dashboard"
                />
              </Box>
              <Box align='end' margin={{top: "large"}}>
          <Button primary width="small" label="Create" href='/'></Button>
          </Box> 
            </Tab>
          </Tabs>
          
        </Box>
      </Box>
      </Box>
    </Form>
  );
};

const styles = {
  btn: { width: '100%', textAlign: 'left', marginTop: '10px', height: '7%' },
};

export default Review;