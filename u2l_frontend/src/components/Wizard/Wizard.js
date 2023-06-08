import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import {
  Box,
  CheckBoxGroup,
  FormField,
  Grid,
  List,
  Heading,
  Form,
  FileInput,
  Button,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Text,
  Spinner,
  Layer,
  TextArea,
  TextInput,
  Notification,
} from 'grommet';
import { Checkmark } from 'grommet-icons';
import CancellationLayer from './CancellationLayer';
import Error from './Error';
import StepFooter from './StepFooter';
import StepContent from './StepContent';
import WizardContext from './WizardContext';
import WizardHeader from './WizardHeader';
import { FormNext, FormPreviousLink, FormPrevious } from 'grommet-icons';
// import BannerNotificationInfo from '../GlobalBannerNotification';
import { getWidth } from './Utils';
import ProjectService from '../../api/ProjectService';
import WizardUtils from '../../utils/WizardUtils';

const WizardValidationExample = ({ containerRef }) => {
  const location = useLocation();
  const defaultFormValues = () => {
    console.log(location);
    if (!location.state) {
      return ({
        project_name: '',
        project_client: '',
        project_manager: '',
        application_name: '',
        source_os: '',
        source_os_version: '',
        target_os: '',
        target_os_version: '',
        analysis_type: '',
        source_jdk: '',
        target_jdk: '',
        source_jsp: '',
        target_jsp: '',
        source_servlet: '',
        target_servlet: '',
        source_compiler: '',
        source_compiler_version: '',
        target_compiler: '',
        target_compiler_version: '',
        source_oracle_version: '',
        target_oracle_version: '',
        source_shell: '',
        source_shell_version: '',
        target_shell: '',
        target_shell_version: '',
        framework: '',
        source_framework_version: '',
        target_framework_version: '',
      })
    } else {
      return ({
        project_name: location.state.formValues.project_name,
        project_client: location.state.formValues.project_client,
        project_manager: location.state.formValues.project_manager,
        application_name: location.state.formValues.application_name,
        source_os: location.state.formValues.source_os,
        source_os_version: location.state.formValues.source_os_version,
        target_os: location.state.formValues.target_os,
        target_os_version: location.state.formValues.target_os_version,
        analysis_type: location.state.formValues.analysis_type,
        source_jdk: location.state.formValues.source_jdk,
        target_jdk: location.state.formValues.target_jdk,
        source_jsp: location.state.formValues.source_jsp,
        target_jsp: location.state.formValues.target_jsp,
        source_servlet: location.state.formValues.source_servlet,
        target_servlet: location.state.formValues.target_servlet,
        source_compiler: location.state.formValues.source_compiler,
        source_compiler_version: location.state.formValues.source_compiler_version,
        target_compiler: location.state.formValues.target_compiler,
        target_compiler_version: location.state.formValues.target_compiler_version,
        source_oracle_version: location.state.formValues.source_oracle_version,
        target_oracle_version: location.state.formValues.target_oracle_version,
        source_shell: location.state.formValues.source_shell,
        source_shell_version: location.state.formValues.source_shell_version,
        target_shell: location.state.formValues.target_shell,
        target_shell_version: location.state.formValues.target_shell_version,
        framework: location.state.formValues.framework,
        source_framework_version: location.state.formValues.source_framework_version,
        target_framework_version: location.state.formValues.target_framework_version,
      })
    }
  };

  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(activeIndex + 1);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(true);
  const wizardRef = useRef();
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [status, setStatus] = React.useState('normal');
  const [showProjectDetails, setShowProjectDetails] = useState(true);
  const [showOSDetails, setShowOSDetails] = useState(false);
  const [showAnalysisType, setShowAnalysisType] = useState(false);


  const handleTabs = (event, nextId) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
    const id = event.currentTarget.id;


    if (id === 'project_details') {
      console.log("project details");
      <StepOne />;
    } else if (id === 'os_details') {
      <StepTwo />;
    } else if (id === 'analysis_type') {
      <StepThree />;
    }
  };

  const onNotificationOpen = () => {
    setNotificationVisible(true);
  };
  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  let navigate = useNavigate();

  useEffect(() => {
    setActiveStep(activeIndex + 1);
  }, [activeIndex]);

  const id = 'simple-wizard';

  React.useEffect(() => {
    const container = wizardRef.current;
    const header = document.querySelector(`#${id}`);
    container.scrollTop = -header.getBoundingClientRect().bottom;
  }, [activeIndex, open]);

  const numberColumns = 2;
  const width = getWidth(numberColumns, theme, size);

  const contextValue = useMemo(
    () => ({
      activeIndex,
      id,
      defaultFormValues,
      setActiveIndex,
      activeStep,
      setActiveStep,
      valid,
      ref: wizardRef,
      setValid,
      steps,
      formValues,
      setFormValues,
      wizardTitle: 'Project Creation Form',
      width,
    }),
    [activeIndex, activeStep, formValues, valid, width]
  );

  function handleSubmit(value) {
    const data = WizardUtils.appendFormData(formValues)

    setNotificationMessage('Analysis in progress please wait!');
    setStatus('info');
    setNotificationVisible(true);

    ProjectService.postProjectDetails(data)
      .then((response) => {
        // response.data
        console.log(response);
        navigate('/dashboard');
      })
      .catch((error) => {
        setNotificationMessage(error.response.data.message);
        setNotificationVisible(true);
      });
  }

  const handleNavigate = () => {
    navigate('/review', { state: { formValues: formValues } });
  };

  return (
    <WizardContext.Provider value={contextValue}>
      <Box align="center" gap="small">
        {notificationVisible && (
          <Notification
            toast
            time={8000}
            status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>

      <Box direction="row-responsive" responsive={true}>
        <Box direction="column" width="small" responsive={true} height="80vh">
          <Button
            label="Code Assessment"
            href="/dashboard"
            style={styles.sideBarbtn}
          />

          {activeIndex === 0 ?
            (<Button
              label="Project Details"
              onClick={(event) => handleTabs(event)}
              style={styles.sideBarbtnonselect}

            />) : ((<Button
              disabled={true}
              label="Project Details"
              onClick={(event) => handleTabs(event)}
              style={styles.btndisable}

            />))
          }

          {activeIndex === 1 ?
            (<Button
              label="OS Details"
              id="os_details"
              onClick={(event) => handleTabs(event)}
              style={styles.sideBarbtnonselect}
            />) : (<Button
              disabled={true}
              label="OS Details"
              id="os_details"
              onClick={(event) => handleTabs(event)}
              style={styles.btndisable}
            />)

          }

          {activeIndex === 2 ? (
            <Button
              label="Analysis Type"
              id="analysis_type"
              onClick={(event) => handleTabs(event)}
              style={styles.sideBarbtnonselect}
            />) :
            (<Button
              label="Analysis Type"
              id="analysis_type"
              disabled={true}
              onClick={(event) => handleTabs(event)}
              style={styles.sideBarbtn}
            />)
          }
          <Button label="Review" style={styles.sideBarbtn} />
          {activeIndex === 2 && (<Button
            margin={{ left: 'small' }}
            label="Review and Create"
            href="/review"
            disabled={true}
            style={styles.btndisable}
          />)}
        </Box>
        <StepContent
          onSubmit={({ value }) => {
            handleSubmit(value);
          }}
        />
      </Box>
      <StepFooter onNavigate={handleNavigate} />

      {open && (
        <CancellationLayer
          target={containerRef && containerRef.current}
          onSetOpen={setOpen}
        />
      )}
    </WizardContext.Provider>
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

export const StepOne = (nextId) => {
  const { valid, setValid } = useContext(WizardContext);
  const size = useContext(ResponsiveContext);
  const { activeIndex, id, steps, width } = useContext(WizardContext);

  return (
    <Box align="center">
      {/* <Box direction="row-responsive" responsive={true} >
        <SideBar /> */}
      <Box width={{ max: 'medium' }} align="center">
        <Box>
          <h3>Project details</h3>
          <FormField
            label="Project name"
            htmlFor="project_name"
            name="project_name"
            required={true}
          >
            <TextInput
              // width="240px"
              // height="37px"
              placeholder="Enter Value"
              id="project_name"
              name="project_name"
              type='text'
            />
          </FormField>

          <FormField
            label="Project Client"
            htmlFor="project_client"
            name="project_client"
            required={true}
          >
            <TextInput
              placeholder="Enter Value"
              id="project_client"
              name="project_client"
            />
          </FormField>
          <FormField
            label="Project Manager"
            htmlFor="project_manager"
            name="project_manager"
            required={true}
          >
            <TextInput
              placeholder="Enter Value"
              id="project_manager"
              name="project_manager"
            />
          </FormField>
          <FormField
            label="Application Name"
            htmlFor="application_name"
            name="application_name"
            required={true}
          >
            <TextInput
              placeholder="Enter Application Name"
              id="application_name"
              name="application_name"
            />
          </FormField>
          {/* <Box align="end" margin={{ Top: "small" }}>
                <Button>Next</Button>
              </Box> */}
          {/* </Box> */}
        </Box>
        {!valid && <Error>There is an error with one or more inputs.</Error>}
      </Box>
    </Box>
  );
};

export const StepTwo = (nextId) => {
  return (
    <Box align="center">
      <Box width={{ max: 'medium' }}>
        <h3>OS details</h3>
        <FormField
          label="Source OS"
          htmlFor="source_os"
          name="source_os"
          required={true}
        >
          <TextInput
            placeholder="Enter Value"
            id="source_os"
            name="source_os"
          />
        </FormField>
        <FormField
          label="Source OS version"
          htmlFor="source_os_version"
          name="source_os_version"
          required={true}
        >
          <TextInput
            placeholder="Enter Value"
            id="source_os_version"
            name="source_os_version"

          />
        </FormField>
        <FormField
          label="Target OS"
          htmlFor="target_os"
          name="target_os"
          required={true}
        >
          <TextInput
            placeholder="Enter Value"
            id="target_os"
            name="target_os"
          />
        </FormField>
        <FormField
          label="Target OS version"
          htmlFor="target_os_version"
          name="target_os_version"
          required={true}
        >
          <TextInput
            placeholder="Enter Value"
            id="target_os_version"
            name="target_os_version"
          />
        </FormField>
      </Box>
    </Box>
  );
};

export const StepThree = (nextId) => {
  const [numFiles, setNumFiles] = useState(0);
  const [showhide, setShowHide] = useState('');
  const [show, setShow] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(true);
  const { activeIndex, id, steps, width } = useContext(WizardContext);
  const [fileInputDisabled, setFileInputDisabled] = useState(true);
  const [proceedButtonDisabled, setProceedButtonDisabled] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleshowhide = (event) => {
    const getLang = event.target.value;
    setFileInputDisabled(false);
    console.log(getLang);
    setShowHide(getLang);
  };

  const handleFramework = (event) => {
    const getFramework = event.target.value;
    console.log(getFramework);
  }

  // const popupSpinner = () => {
  //   setShowpinner(true);
  //   setShow(true);
  //   setFileUploaded(true);

  //   {
  //     fileUploaded && (
  //       <Layer full={true} onClickOutside={() => setFileUploaded(false)}>
  //         <Box width="250px" height="100px" direction="column" align="center">
  //           <h3>File Uploaded</h3>
  //         </Box>
  //       </Layer>
  //     );
  //   }

  //   // setTimeout(() => {
  //   // setShow(false);
  //   // }, 10000);
  // };

  const handleSpinner = (e) => {
    e.preventDefault();
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  };

  const uploadFile = () => {
    console.log('Uploading file');
    // axios.post('https://localhost:5000/uploaded_file', uploadFile)
  };

  // const BannerNotificationInfo = () => (
  //   <Notification
  //     status="info"
  //     onClose={() => {}}
  //     actions={[
  //       {
  //         href: '#',
  //         label: 'View more',
  //       },
  //     ]}
  //     message="Updates to this service will be available soon
  //      including feature a, b, and c."
  //     global
  //   />
  // );

  return (
    <Box align="center">
      <Box width={{ max: 'medium' }}>
        <Heading level={2} size="small" marginTop="0">
          {/* margin="2"  for heading if needed*/}
          Analysis Type
        </Heading>

        <FormField
          htmlFor="analysis_type"
          name="analysis_type"
          label="Type of analysis"
        >
          <Select
            placeholder="Analysis Type"
            id="analysis_type"
            name="analysis_type"
            options={[
              'Java',
              'Shell',
              'C',
              'C++',
              'Pro*C',
              'C/Pro*C',
              'C++/Pro*C',
            ]}
            onChange={(e) => handleshowhide(e)}
          />
        </FormField>

        {/* Div after Java Slelected */}
        {showhide === 'Java' && (
          <Box width="medium">
            <FormField
              label="Source JDK"
              htmlFor="source_jdk"
              name="source_jdk"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="source_jdk"
                name="source_jdk"
              />
            </FormField>
            <FormField
              label="Target JDK"
              htmlFor="target_jdk"
              name="target_jdk"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="target_jdk"
                name="target_jdk"
              />
            </FormField>

            <FormField
              label="Source JSP"
              htmlFor="source_jsp"
              name="source_jsp"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_jsp"
                name="source_jsp"
              />
            </FormField>
            <FormField
              label="Target JSP"
              htmlFor="target_jsp"
              name="target_jsp"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_jsp"
                name="target_jsp"
              />
            </FormField>

            <FormField
              label="Source Servlet"
              htmlFor="source_servlet"
              name="source_servlet"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_servlet"
                name="source_servlet"
              />
            </FormField>
            <FormField
              label="Target Servlet"
              htmlFor="target_servlet"
              name="target_servlet"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_servlet"
                name="target_servlet"
              />
            </FormField>
          </Box>
        )}

        {/* Div After C selected */}
        {showhide === 'C' && (
          <Box>
            <FormField
              label="Source Compiler"
              htmlFor="source_compiler"
              name="source_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
              />
            </FormField>
            <FormField
              label="Source Compiler version"
              htmlFor="source_compiler_version"
              name="source_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </FormField>
            <FormField
              label="Target Compiler"
              htmlFor="target_compiler"
              name="target_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
              />
            </FormField>
            <FormField
              label="Target Compiler version"
              htmlFor="target_compiler_version"
              name="target_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </FormField>
          </Box>
        )}

        {/* Div After C++ selected */}
        {showhide === 'C++' && (
          <Box>
            <FormField
              label="Source Compiler"
              htmlFor="source_compiler"
              name="source_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
              />
            </FormField>
            <FormField
              label="Source Compiler version"
              htmlFor="source_compiler_version"
              name="source_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </FormField>
            <FormField
              label="Target Compiler"
              htmlFor="target_compiler"
              name="target_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
              />
            </FormField>
            <FormField
              label="Target Compiler version"
              htmlFor="target_compiler_version"
              name="target_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </FormField>
          </Box>
        )}

        {/* Div after Pro*C selected */}
        {showhide === 'Pro*C' && (
          <Box>
            <FormField
              label="Source pre-compiler"
              htmlFor="source_pre_compiler"
              name="source_pre_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler"
                name="source_pre_compiler"
              />
            </FormField>

            <FormField
              label="Source pre-compiler version"
              htmlFor="source_pre_compiler_version"
              name="source_pre_compiler_version"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
              />
            </FormField>

            <FormField
              label="Target pre-compiler"
              htmlFor="target_pre_compiler"
              name="Target_pre_compiler"
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </FormField>

            <FormField
              label="Target pre-compiler version"
              htmlFor="target_pre_compiler_version"
              name="target_pre_compiler_version"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
              />
            </FormField>
          </Box>
        )}

        {/* Div after c/c++/Pro*C selected */}
        {showhide === 'C/C++/Pro*C' && (
          <Box>
            <FormField
              label="Source Compiler"
              htmlFor="source_compiler"
              name="source_compiler"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
              />
            </FormField>
            <FormField
              label="Source Compiler version"
              htmlFor="source_compiler_version"
              name="source_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </FormField>
            <FormField
              label="Target Compiler"
              htmlFor="target_compiler"
              name="target_compiler"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
              />
            </FormField>
            <FormField
              label="Target Compiler version"
              htmlFor="target_compiler_version"
              name="target_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </FormField>
            <FormField
              label="Source pre-compiler"
              htmlFor="source_pre_compiler"
              name="source_pre_compiler"
            >
              <TextInput
                disabled={true}
                placeholder="Oracle"
                id="source_pre_compiler"
                name="source_pre_compiler"
              />
            </FormField>

            <FormField
              label="Source pre-compiler version"
              htmlFor="source_pre_compiler_version"
              name="source_pre_compiler_version"
            >
              <TextInput
                disabled={true}
                placeholder="Oracle"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
              />
            </FormField>

            <FormField
              label="Target pre-compiler"
              htmlFor="target_pre_compiler"
              name="Target_pre_compiler"
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </FormField>

            <FormField
              label="Target pre-compiler version"
              htmlFor="target_pre_compiler_version"
              name="target_pre_compiler_version"
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
              />
            </FormField>
          </Box>
        )}

        {/* Div after shell selected */}
        {showhide === 'Shell' && (
          <Box>
            <FormField
              label="Source Shell"
              htmlFor="source_shell"
              name="source_shell"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="source_shell"
                name="source_shell"
              />
            </FormField>
            <FormField
              label="Source Shell Version"
              htmlFor="source_shell_version"
              name="source_shell_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_shell_version"
                name="source_shell_version"
              />
            </FormField>
            <FormField
              label="Target Shell"
              htmlFor="target_shell"
              name="target_shell"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="target_shell"
                name="target_shell"
              />
            </FormField>
            <FormField
              label="Target Shell Version"
              htmlFor="target_shell_version"
              name="target_shell_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_shell_version"
                name="target_shell_version"
              />
            </FormField>
          </Box>
        )}

        {/* Div after C/Pro*C selected */}
        {showhide === 'C/Pro*C' && (
          <Box>
            <FormField
              label="Source Compiler"
              htmlFor="source_compiler"
              name="source_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
              />
            </FormField>
            <FormField
              label="Source Compiler version"
              htmlFor="source_compiler_version"
              name="source_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </FormField>
            <FormField
              label="Target Compiler"
              htmlFor="target_compiler"
              name="target_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
              />
            </FormField>
            <FormField
              label="Target Compiler version"
              htmlFor="target_compiler_version"
              name="target_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </FormField>
            <FormField
              label="Source pre-compiler"
              htmlFor="source_pre_compiler"
              name="source_pre_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler"
                name="source_pre_compiler"
              />
            </FormField>

            <FormField
              label="Source pre-compiler version"
              htmlFor="source_pre_compiler_version"
              name="source_pre_compiler_version"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
              />
            </FormField>

            <FormField
              label="Target pre-compiler"
              htmlFor="target_pre_compiler"
              name="Target_pre_compiler"
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </FormField>

            <FormField
              label="Target pre-compiler version"
              htmlFor="target_pre_compiler_version"
              name="target_pre_compiler_version"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
              />
            </FormField>
          </Box>
        )}

        {/* Div after C++/Pro*C selected */}
        {showhide === 'C++/Pro*C' && (
          <Box>
            <FormField
              label="Source Compiler"
              htmlFor="source_compiler"
              name="source_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
              />
            </FormField>
            <FormField
              label="Source Compiler version"
              htmlFor="source_compiler_version"
              name="source_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </FormField>
            <FormField
              label="Target Compiler"
              htmlFor="target_compiler"
              name="target_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
              />
            </FormField>
            <FormField
              label="Target Compiler version"
              htmlFor="target_compiler_version"
              name="target_compiler_version"
            >
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </FormField>
            <FormField
              label="Source pre-compiler"
              htmlFor="source_pre_compiler"
              name="source_pre_compiler"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler"
                name="source_pre_compiler"
              />
            </FormField>

            <FormField
              label="Source pre-compiler version"
              htmlFor="source_pre_compiler_version"
              name="source_pre_compiler_version"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
              />
            </FormField>

            <FormField
              label="Target pre-compiler"
              htmlFor="target_pre_compiler"
              name="Target_pre_compiler"
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </FormField>

            <FormField
              label="Target pre-compiler version"
              htmlFor="target_pre_compiler_version"
              name="target_pre_compiler_version"
              required={true}
            >
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
              />
            </FormField>
          </Box>
        )}

        <FormField
          htmlFor="framework"
          name="framework"
          label="Framework"
        >
          <Select
            placeholder="Select"
            id="framework"
            name="framework"
            options={[
              'Spring',
              'Struts',
              'JSF',
              'Hibernate',
            ]}
            onChange={(e) => handleFramework(e)}
          />
        </FormField>

        <FormField
          label="Source Framework Version"
          htmlFor="source_framework_version"
          name="source_framework_version"
          required={true}
        >
          <TextInput
            placeholder="Enter value"
            id="source_framework_version"
            name="source_framework_version"
          />
        </FormField>

        <FormField
          label="Target Framework Version"
          htmlFor="target_framework_version"
          name="target_framework_version"
          required={true}
        >
          <TextInput
            placeholder="Enter value"
            id="target_framework_version"
            name="target_framework_version"
          />
        </FormField>

        <Box data-testid="test-4" width="medium" margin="0" pad="small">
          <Text>Source Code</Text>
          <FileInput
            id="file_name"
            name="file_name"
            label="Source code"
            accept=".zip"
            messages={{
              browse: numFiles > 0 ? 'Replace file' : 'Select file',
            }}
            disabled={fileInputDisabled}
            required={true}
            onChange={(event, { files }) => {
              setNumFiles(files.length);
              setProceedButtonDisabled(false);
            }}
          />

          {/* <Box
        margin={{ top: "small", left: "small" }}
        direction="row"
        gap="large"
      >
        <Button>Previous</Button>
        <Button href="/review">Review + Create</Button>
        <Button onClick={(e) => handleSpinner(e)}>Proceed</Button>
      </Box> */}
          {showSpinner && (
            <Box>
              <Layer model>
                <Box pad="small">
                  <Text>File uploading in Process</Text>
                  <Box align="center">
                    <Spinner
                      message={{
                        start: 'Loading data.',
                        end: 'Data has been loaded.',
                      }}
                    />
                  </Box>
                </Box>
              </Layer>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const data = [
  'Summary value of step 1',
  'More summary value of step 1',
  'Summary value of step 2',
  'More summary values from step 2',
];

export const steps = [
  {
    inputs: <StepOne />,
    title: 'Previous',
  },
  {
    inputs: <StepTwo />,
    title: 'Previous',
  },
  {
    inputs: <StepThree />,
    title: 'Previous',
  },
];

WizardValidationExample.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default WizardValidationExample;
