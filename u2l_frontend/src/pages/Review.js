import React from 'react';
import { Box, Text, Button } from 'grommet';
import { FormEdit, Previous } from 'grommet-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import WizardUtils from '../utils/WizardUtils';
import ProjectService from '../api/ProjectService';

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSubmit(value) {
    const data = WizardUtils.appendFormData(location.state.formValues)
 
    //  setNotificationMessage('Analysis in progress please wait!');
    //  setStatus('info');
    //  setNotificationVisible(true);
 
     ProjectService.postProjectDetails(data)
       .then((response) => {
         // response.data
         console.log(response);
         navigate('/dashboard');
       })
       .catch((error) => {
        //  setNotificationMessage(error.response.data.message);
        //  setNotificationVisible(true);
       });
   }

  const handleTabs = (event, nextId) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
    // const id = event.currentTarget.id;
  };

  const handleEdit = (formValues) => {
    console.log(location.state.formValues)
    navigate('/wizard', { state: { formValues: location.state.formValues } });
  }

  return (
    <Box direction="row-responsive" responsive={true} flex="shrink">
      <Box direction="column" width="small" responsive={true} height="91vh">
        <Button label="Code Assessment" href="/dashboard" style={styles.sideBarbtn} />
        <Button
          disabled={true}
          label="Project Details"
          onClick={(event) => handleTabs(event)}
          style={styles.btndisable}

        />
        <Button
          disabled={true}
          label="OS Details"
          id="os_details"
          onClick={(event) => handleTabs(event)}
          style={styles.btndisable}
        />
        <Button
          label="Analysis Type"
          id="analysis_type"
          disabled={true}
          onClick={(event) => handleTabs(event)}
          style={styles.sideBarbtn}
        />
        <Button label="Review" style={styles.sideBarbtn} />
        <Button
          margin={{ left: 'small' }}
          label="Review and Create"
          href="/review"
          style={styles.sideBarbtnonselect}
        />
      </Box>
      <Box margin={{ left: 'large' }} direction='column'>
        <h2>Overall Review</h2>
        <Box gap="small" direction="row">
          <h3>Project Details: </h3>
          <Box
            // align={!["xsmall", "small"].includes(size) ? "start" : undefined}
            margin={{ top: "medium", bottom: "small", left: "large" }}
          >
            <Button label="Edit" icon={<FormEdit />} onClick={handleEdit} secondary></Button>
          </Box>
        </Box>

        <Box gap="small" >
          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Project name:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.project_name}
            </Text>
          </Box>

          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Project client:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.project_client}
            </Text>
          </Box>

          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Project manager:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.project_manager}
            </Text>
          </Box>

          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Application name:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.application_name}
            </Text>
          </Box>
        </Box>

        <h3>OS Details</h3>
        <Box gap="small" direction='column'>
          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Source OS:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.source_os}
            </Text>
          </Box>
          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Source OS Version:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.source_os_version}
            </Text>
          </Box>
          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Target OS:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.target_os}
            </Text>
          </Box>

          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Target OS Version:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.target_os}
            </Text>
          </Box>
        </Box>

        <h3>Analysis Type</h3>
        <Box gap="small">
          <Box direction='row'>
            <Box width="small">
              <Text weight="bold">
                Type of Analysis:
              </Text>
            </Box>
            <Text margin={{ left: 'medium' }}>
              {location.state.formValues.analysis_type}
            </Text>
          </Box>

          {location.state.formValues.analysis_type === 'Java' && (
            <Box gap="small">
              <Box direction='row'>
                <Box width="small">
                  <Text weight="bold">
                    Source JDK:
                  </Text>
                </Box>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_jdk}
                </Text>
              </Box>

              <Box direction='row'>
                <Box width="small">
                  <Text weight="bold">
                    Target JDK:
                  </Text>
                </Box>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_jdk}
                </Text>
              </Box>

              <Box direction='row'>
                <Box width="small">
                  <Text weight="bold">
                    Source JSP:
                  </Text>
                </Box>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_jsp}
                </Text>
              </Box>

              <Box direction='row'>
                <Box width="small">
                  <Text weight="bold">
                    Target JSP:
                  </Text>
                </Box>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_jsp}
                </Text>
              </Box>

              <Box direction='row'>
                <Box width="small">
                  <Text weight="bold">
                    Source Servlet:
                  </Text>
                </Box>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_servlet}
                </Text>
              </Box>

              <Box direction='row'>
                <Box width="small">
                  <Text weight="bold">
                    Target Servlet:
                  </Text>
                </Box>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_servlet}
                </Text>
              </Box>

              {/* <Text>
              Source code:
              <Text weight="bold" margin={{ left: 'medium' }}>
                {location.state.formValues.source_jdk}
              </Text>
            </Text> */}
            </Box>
          )}

          {location.state.formValues.analysis_type === 'C' && (
            <Box gap="small">
              <Text>
                <Text weight="bold">
                  Source Compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Source Compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_compiler_version}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_compiler_version}
                </Text>
              </Text>
            </Box>
          )}

          {location.state.formValues.analysis_type === 'C++' && (
            <Box gap="small">
              <Text>
                <Text weight="bold">
                  Source Compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Source Compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_compiler_version}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_compiler_version}
                </Text>
              </Text>
            </Box>
          )}

          {location.state.formValues.analysis_type === 'Pro*C' && (
            <Box gap="small">
              <Text>
                <Text weight="bold">
                  Source pre-compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {/* {location.state.formValues.source_pre_compiler} */}
                  {"Oracle"}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Source pre-compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_pre_compiler_version}

                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target pre-compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_pre_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target pre-compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_pre_compiler_version}
                </Text>
              </Text>
            </Box>
          )}

          {location.state.formValues.analysis_type === 'C/C++/Pro*C' && (
            <Box gap="small">
              <Text>
                <Text weight="bold">
                  Source Compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Source Compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_compiler_version}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_compiler_version}
                </Text>
              </Text>
              <Text>
                <Text weight="bold">
                  Source pre-compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_pre_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Source pre-compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_pre_compiler_version}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target pre-compiler:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_pre_compiler}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target pre-compiler version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.taget_pre_compiler_version}
                </Text>
              </Text>
            </Box>
          )}

          {location.state.formValues.analysis_type === 'Shell' && (
            <Box gap="small">
              <Text>
                <Text weight="bold">
                  Source Shell:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_shell}
                </Text>
              </Text>

              <Text>
                <Text weight="bold" >
                  Source Shell Version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.source_shell_version}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Shell:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_shell}
                </Text>
              </Text>

              <Text>
                <Text weight="bold">
                  Target Shell Version:
                </Text>
                <Text margin={{ left: 'medium' }}>
                  {location.state.formValues.target_shell_version}
                </Text>
              </Text>
            </Box>
          )}
        </Box>

        <Box direction="row" gap="medium" margin={{ left: "50%", top: "10%" }} >
          <Button icon={<Previous />} label="Previous" style={{borderRadius:"0"}}></Button>
          <Button primary label="Create" onClick={handleSubmit} style={{borderRadius:"0"}}></Button>
        </Box>
      </Box>
    </Box>
  );
};


const styles = {
  btn: { width: '100%', textAlign: 'left' },
  sideBarbtn: {
    display: 'flex', height: '6vh',
    alignItems: 'center', borderRadius: '0',
    borderBottom: '0.1px solid white', fontWeight: 'normal'
  },
  sideBarbtnonselect: {
    display: 'flex', height: '6vh',
    alignItems: 'center', borderRadius: '0',
    borderBottom: '0.1px solid white', fontWeight: 'bold',
    background: '#0000000A 0% 0% no-repeat padding-box',

  },
  btndisable: {
    display: 'flex', height: '6vh',
    alignItems: 'center', borderRadius: '0',
    borderBottom: '0.1px solid white', fontWeight: 'normal',
    background: " #F7F7F7 0% 0% no-repeat padding-box",
    width: '100%', textAlign: 'left'
  },
};
export default Review;
