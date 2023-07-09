import React from 'react';
import { Box, Text, Button } from 'grommet';
import { FormEdit, Previous } from 'grommet-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import WizardUtils from '../utils/WizardUtils';
import ProjectService from '../api/ProjectService';
import classes from './Styling.module.css';

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formValuesData = location.state.formValues;

  function handleSubmit(value) {
    const data = WizardUtils.appendFormData(formValuesData)
 
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
  };

  const handleEdit = (formValues) => {
    console.log(formValuesData)
    navigate('/wizard', { state: { formValues: formValuesData } });
  }

  return (
    <Box direction="row-responsive" responsive={true} flex="shrink">
      <Box direction="column" width="small" responsive={true} height="91vh">
        <Button label="Code Assessment" 
        href="/dashboard" 
        // className={classes.sideBarbtn} 
        style={styles.sideBarbtn} 
        />
        
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
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Project name:
              </Text>
            </Box>
            <Text className={classes.alignment}>
              {formValuesData.project_name}
            </Text>
          </Box>

          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Project client:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.project_client}
            </Text>
          </Box>

          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Project manager:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.project_manager}
            </Text>
          </Box>

          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Application name:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.application_name}
            </Text>
          </Box>
        </Box>

        <h3>OS Details</h3>
        <Box gap="small" direction='column'>
          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Source OS:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.source_os}
            </Text>
          </Box>
          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Source OS Version:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.source_os_version}
            </Text>
          </Box>
          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Target OS:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.target_os}
            </Text>
          </Box>

          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Target OS Version:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.target_os}
            </Text>
          </Box>
        </Box>

        <h3>Analysis Type</h3>
        <Box gap="small">
          <Box direction='row'>
            <Box className={classes.boxWidth}>
              <Text className={classes.textsize}>
                Type of Analysis:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.analysis_type}
            </Text>
          </Box>

          {formValuesData.analysis_type === 'Java' && (
            <Box gap="small">
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                  <Text className={classes.textsize}>
                    Source JDK:
                  </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_jdk}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                  <Text className={classes.textsize}>
                    Target JDK:
                  </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_jdk}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                  <Text className={classes.textsize}>
                    Source JSP:
                  </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_jsp}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                  <Text className={classes.textsize}>
                    Target JSP:
                  </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_jsp}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                  <Text className={classes.textsize}>
                    Source Servlet:
                  </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_servlet}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                  <Text className={classes.textsize}>
                    Target Servlet:
                  </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_servlet}
                </Text>
              </Box>

              {/* <Text>
              Source code:
              <Text className={classes.textsize} margin={{ left: 'medium' }}>
                {formValuesData.source_jdk}
              </Text>
            </Text> */}
            </Box>
          )}

          {formValuesData.analysis_type === 'C' && (
            <Box gap="small">
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_compiler_version}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_compiler_version}
                </Text>
              </Box>
            </Box>
          )}

          {formValuesData.analysis_type === 'C++' && (
            <Box gap="small">
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_compiler_version}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_compiler_version}
                </Text>
              </Box>
            </Box>
          )}

          {formValuesData.analysis_type === 'Pro*C' && (
            <Box gap="small">
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source pre-compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {/* {formValuesData.source_pre_compiler} */}
                  {"Oracle"}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source pre-compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_pre_compiler_version}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target pre-compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_pre_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target pre-compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_pre_compiler_version}
                </Text>
              </Box>
            </Box>
          )}

          {formValuesData.analysis_type === 'C/C++/Pro*C' && (
            <Box gap="small">
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_compiler_version}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_compiler_version}
                </Text>
              </Box>
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source pre-compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_pre_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source pre-compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_pre_compiler_version}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target pre-compiler:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_pre_compiler}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target pre-compiler version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.taget_pre_compiler_version}
                </Text>
              </Box>
            </Box>
          )}

          {formValuesData.analysis_type === 'Shell' && (
            <Box gap="small">
              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Source Shell:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_shell}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize} >
                  Source Shell Version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.source_shell_version}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Shell:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_shell}
                </Text>
              </Box>

              <Box direction='row'>
                <Box className={classes.boxWidth}>
                <Text className={classes.textsize}>
                  Target Shell Version:
                </Text>
                </Box>
                <Text className='classes.alignment'>
                  {formValuesData.target_shell_version}
                </Text>
              </Box>
            </Box>
          )}
        </Box>

        <h3>Framework</h3>
        <Box gap="small"> 
        <Box direction='row'>
            <Box width="small">
              <Text className={classes.textsize}>
                Framework:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.framework}
            </Text>
          </Box>

          <Box direction='row'>
            <Box width="small">
              <Text className={classes.textsize}>
              Source Framework Version:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.source_framework_version}
            </Text>
          </Box>

          <Box direction='row'>
            <Box width="small">
              <Text className={classes.textsize}>
              Target Framework Version:
              </Text>
            </Box>
            <Text className='classes.alignment'>
              {formValuesData.target_framework_version}
            </Text>
          </Box>
        </Box>

        <Box direction="row" gap="medium" margin={{ left: "70%", top: "10%", bottom:'7%' }} >
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
