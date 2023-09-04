import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import {
  Box,
  FormField,
  Heading,
  FileInput,
  Button,
  ResponsiveContext,
  Select,
  Text,
  Spinner,
  Layer,
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
// import FileReader from 'filereader';

const WizardValidationExample = ({ containerRef }) => {
  const location = useLocation();

  const defaultFormValues = () => {
    
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
        source_pre_compiler: '',
        source_pre_compiler_version:'',
        target_pre_compiler:'',
        target_pre_compiler_version: '',
        framework: '',
        source_framework_version: '',
        target_framework_version: '',
        middleware:''
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
        source_pre_compiler: location.state.formValues.source_pre_compiler,
        source_pre_compiler_version: location.state.formValues.source_pre_compiler_version,
        target_pre_compiler: location.state.formValues.target_pre_compiler,
        target_pre_compiler_version: location.state.formValues.target_pre_compiler_version,
        framework: location.state.formValues.framework,
        source_framework_version: location.state.formValues.source_framework_version,
        target_framework_version: location.state.formValues.target_framework_version,
        file_name: location.state.formValues.file_name,
        middleware: location.state.formValues.middleware,
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
    navigate('/review', { state: { formValues: formValues } });
    // const data = WizardUtils.appendFormData(formValues)

    // setNotificationMessage('Analysis in progress please wait!');
    // setStatus('info');
    // setNotificationVisible(true);

    // ProjectService.postProjectDetails(data)
    //   .then((response) => {
    //     // response.data
    //     console.log(response);
    //     navigate('/dashboard');
    //   })
    //   .catch((error) => {
    //     setNotificationMessage(error.response.data.message);
    //     setNotificationVisible(true);
    //   });
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
        {/*Sidebar*/}
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
      <StepFooter formValues={formValues} />

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
      <Box width={{ max: 'medium' }} align="center">
        <Box>
          <h3>Project details</h3>
          <Box htmlFor="project_name" direction='row' margin={{ bottom: 'medium', top: 'medium' }}>
            <Box width='80%'>
              <label htmlFor="project_name">Project name*</label>
            </Box>
            <TextInput
              placeholder="Enter Value"
              id="project_name"
              name="project_name"
              type='text'
              required={true}
            />
          </Box>

          <Box htmlFor="project_client" direction='row' margin={{ bottom: 'medium' }}>
            <Box width='80%'>
              <label htmlFor="project_client" >Project Client*</label>
            </Box>
            <TextInput
              placeholder="Enter Value"
              id="project_client"
              name="project_client"
              required={true}
            />
          </Box>

          <Box htmlFor="project_manager" direction='row' margin={{ bottom: 'medium' }}>
            <Box width='80%'>
              <label htmlFor="project_manager" >Project Manager*</label>
            </Box>
            <TextInput
              placeholder="Enter Value"
              id="project_manager"
              name="project_manager"
              required={true}
            />
          </Box>

          <Box htmlFor="application_name" direction='row' margin={{ bottom: 'medium' }}>
            <Box width='80%'>
              <label htmlFor="application_name">Application Name*</label>
            </Box>
            <TextInput
              placeholder="Enter Value"
              id="application_name"
              name="application_name"
              required={true}
            />
          </Box>

        </Box>
        {!valid && <Error>There is an error with one or more inputs.</Error>}
      </Box>
    </Box>
  );
};

export const StepTwo = (nextId) => {
  const { valid, setValid } = useContext(WizardContext);
  return (
    <Box align="center">
      <Box width={{ max: 'medium' }}>
        <h3>OS details</h3>

        <Box htmlFor="source_os" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='80%'>
            <label htmlFor="source_os">Source OS*</label>
          </Box>
          <TextInput
            placeholder="Enter Value"
            id="source_os"
            name="source_os"
            required={true}
          />
        </Box>

        <Box htmlFor="source_os_version" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='80%'>
            <label htmlFor="source_os_version">Source OS version*</label>
          </Box>
          <TextInput
            placeholder="Enter Value"
            id="source_os_version"
            name="source_os_version"
            required={true}
          />
        </Box>

        <Box htmlFor="target_os" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='80%'>
            <label htmlFor="target_os">Target OS*</label>
          </Box>
          <TextInput
            placeholder="Enter Value"
            id="target_os"
            name="target_os"
            required={true}
          />
        </Box>

        <Box htmlFor="target_os_version" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='80%'>
            <label htmlFor="target_os_version">Target OS version*</label>
          </Box>
          <TextInput
            placeholder="Enter Value"
            id="target_os_version"
            name="target_os_version"
            required={true}
          />
        </Box>

      </Box>
      {!valid && <Error>There is an error with one or more inputs.</Error>}
    </Box>
  );
};

export const StepThree = (nextId) => {
  const [numFiles, setNumFiles] = useState(0);
  const [show, setShow] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(true);
  const { activeIndex, id, steps, width } = useContext(WizardContext);
  const [fileInputDisabled, setFileInputDisabled] = useState(true);
  const [proceedButtonDisabled, setProceedButtonDisabled] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  // const [saveFileName, setSaveFileName] = useState('');
  // const [inputValue, setInputValue] = useState("");

  const location = useLocation();


  const file = useRef();
  const handlClick = () => {
    localStorage.setItem("inputValue", file.current.value)
  }


  const defaultFormValues = () => {
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
        source_pre_compiler: '',
        source_pre_compiler_version:'',
        target_pre_compiler:'',
        target_pre_compiler_version: '',
        file_name:'',
        middleware:''
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
        source_pre_compiler: location.state.formValues.source_pre_compiler,
        source_pre_compiler_version: location.state.formValues.source_pre_compiler_version,
        target_pre_compiler: location.state.formValues.target_pre_compiler,
        target_pre_compiler_version: location.state.formValues.target_pre_compiler_version,
        framework: location.state.formValues.framework,
        source_framework_version: location.state.formValues.source_framework_version,
        target_framework_version: location.state.formValues.target_framework_version,
        file_name: location.state.formValues.file_name,
        middleware: location.state.formValues.middleware,
      })
    }
  };

  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleMiddleware = (event) => {
    const getMiddleware = event.target.value;
    console.log(getMiddleware);
  }

  const defaultLanguage = () => {
    if (location.state) {
      return location.state.formValues.analysis_type
    } else {
      return formValues.analysis_type
    }
  }
  const [showhide, setShowHide] = useState(defaultLanguage);

  const languages = [
    'Java',
    'Shell',
    'C',
    'C++',
    'Pro*C',
    'C/Pro*C',
    'C++/Pro*C',
  ]

  const handleshowhide = (event) => {
    const getLang = event.target.value;
    setFileInputDisabled(false);
    setShowHide(getLang);
  };

  const handleFramework = (event) => {
    const getFramework = event.target.value;
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

  const saveFile = (files) => {
    if (formValues['file_name']) {
      setFileInputDisabled(false);
    }
  }

  return (
    <Box align="center">
      <Box width={{ max: 'medium' }}>
        <Heading level={2} size="small" marginTop="0">
          Analysis Type
        </Heading>

        <Box htmlFor="analysis_type" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='68%'>
            <label htmlFor="analysis_type">Type of analysis*</label>
          </Box>
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
            required={true}
          />
        </Box>

        {/* Div after Java Slelected */}
        {showhide === 'Java' && (
          <Box width="medium">
            <Box htmlFor="source_jdk" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_jdk">Source JDK*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_jdk"
                name="source_jdk"
                required={true}
              />
            </Box>

            <Box htmlFor="target_jdk" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_jdk">Target JDK*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_jdk"
                name="target_jdk"
                required={true}
              />
            </Box>

            <Box htmlFor="source_jsp" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_jsp">Source JSP</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_jsp"
                name="source_jsp"
              />
            </Box>

            <Box htmlFor="target_jsp" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_jsp">Target JSP</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_jsp"
                name="target_jsp"
              />
            </Box>

            <Box htmlFor="source_servlet" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_servlet">Source Servlet</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_servlet"
                name="source_servlet"
              />
            </Box>

            <Box htmlFor="target_servlet" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_servlet">Target Servlet</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_servlet"
                name="target_servlet"
              />
            </Box>
          </Box>
        )}

        {/* Div After C selected */}
        {showhide === 'C' && (
          <Box>

            <Box htmlFor="source_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler">Source Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="source_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler_version">Source Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </Box>

            <Box htmlFor="target_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler">Target Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
                required={true}
              />
            </Box>


            <Box htmlFor="target_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler_version">Target Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </Box>


            <Box htmlFor="middleware" direction='row' margin={{ bottom: 'medium' }}>
            <Box width='68%'>
            <label htmlFor="middleware">Middleware</label>
          </Box>
          <Select
            placeholder="Select"
            id="middleware"
            name="middleware"
            options={[
              'Tuxedo',
              
            ]}
            onChange={(e) => handleMiddleware(e)}
          />
            </Box>



          </Box>
        )}

        {/* Div After C++ selected */}
        {showhide === 'C++' && (
          <Box>

            <Box htmlFor="source_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler">Source Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="source_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler_version">Source Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </Box>

            <Box htmlFor="target_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler">Target Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="target_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler_version">Target Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </Box>
          </Box>
        )}

        {/* Div after Pro*C selected */}
        {showhide === 'Pro*C' && (
          <Box>
            <Box htmlFor="source_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler">Source pre-compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler"
                name="source_pre_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="source_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler_version">Source pre-compiler version*</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
                required={true}
              />
            </Box>

            <Box htmlFor="target_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler">Target pre-compiler</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </Box>

            <Box htmlFor="target_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler_version">Target pre-compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
                required={true}
              />
            </Box>

          </Box>
        )}

        {/* Div after c/c++/Pro*C selected */}
        {showhide === 'C/C++/Pro*C' && (
          <Box>


            <Box htmlFor="source_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler">Source Compiler</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"

              />
            </Box>

            <Box htmlFor="source_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler_version">Source Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </Box>

            <Box htmlFor="target_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler">Target Compiler</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"

              />
            </Box>

            <Box htmlFor="target_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler_version">Target Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </Box>

            <Box htmlFor="source_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler">Source pre-compiler</label>
              </Box>
              <TextInput
                disabled={true}
                placeholder="Oracle"
                id="source_pre_compiler"
                name="source_pre_compiler"
              />
            </Box>

            <Box htmlFor="source_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler_version">Source pre-compiler version</label>
              </Box>
              <TextInput
                disabled={true}
                placeholder="Oracle"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
              />
            </Box>

            <Box htmlFor="target_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler">Target pre-compiler</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </Box>

            <Box htmlFor="target_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler_version">Target pre-compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
              />
            </Box>
          </Box>
        )}

        {/* Div after shell selected */}
        {showhide === 'Shell' && (
          <Box>

            <Box htmlFor="source_shell" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_shell">Source Shell*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_shell"
                name="source_shell"
                required={true}
              />
            </Box>

            <Box htmlFor="source_shell_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_shell_version">Source Shell Version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_shell_version"
                name="source_shell_version"
              />
            </Box>


            <Box htmlFor="target_shell" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_shell">Target Shell*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_shell"
                name="target_shell"
                required={true}
              />
            </Box>

            <Box htmlFor="target_shell_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_shell_version">Target Shell Version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_shell_version"
                name="target_shell_version"
              />
            </Box>
          </Box>
        )}

        {/* Div after C/Pro*C selected */}
        {showhide === 'C/Pro*C' && (
          <Box>
            <Box htmlFor="source_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler">Source Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
                required={true}
              />
            </Box>
            <Box htmlFor="source_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler_version">Source Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </Box>
            <Box htmlFor="target_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler">Target Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="target_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler_version">Target Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </Box>

            <Box htmlFor="source_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler">Source pre-compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler"
                name="source_pre_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="source_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler_version">Source pre-compiler version*</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
                required={true}
              />
            </Box>

            <Box htmlFor="target_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler">Target pre-compiler</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </Box>

            <Box htmlFor="target_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler_version">Target pre-compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
                required={true}
              />
            </Box>

          </Box>
        )}

        {/* Div after C++/Pro*C selected */}
        {showhide === 'C++/Pro*C' && (
          <Box>
            <Box htmlFor="source_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler">Source Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler"
                name="source_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="source_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_compiler_version">Source Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="source_compiler_version"
                name="source_compiler_version"
              />
            </Box>

            <Box htmlFor="target_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler">Target Compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler"
                name="target_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="target_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_compiler_version">Target Compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter Value"
                id="target_compiler_version"
                name="target_compiler_version"
              />
            </Box>
            <Box htmlFor="source_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler">Source pre-compiler*</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler"
                name="source_pre_compiler"
                required={true}
              />
            </Box>

            <Box htmlFor="source_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="source_pre_compiler_version">Source pre-compiler version*</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="source_pre_compiler_version"
                name="source_pre_compiler_version"
                required={true}
              />
            </Box>

            <Box htmlFor="target_pre_compiler" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler">Target pre-compiler</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler"
                name="target_pre_compiler"
              />
            </Box>

            <Box htmlFor="target_pre_compiler_version" direction='row' margin={{ bottom: 'medium' }}>
              <Box width='medium'>
                <label htmlFor="target_pre_compiler_version">Target pre-compiler version</label>
              </Box>
              <TextInput
                placeholder="Enter value"
                id="target_pre_compiler_version"
                name="target_pre_compiler_version"
                required={true}
              />
            </Box>

          </Box>
        )}

        <Box htmlFor="framework" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='68%'>
            <label htmlFor="framework">Framework</label>
          </Box>
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
        </Box>

        <Box htmlFor="source_framework_version" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='medium'>
            <label htmlFor="source_framework_version">Source Framework Version</label>
          </Box>
          <TextInput
            placeholder="Enter value"
            id="source_framework_version"
            name="source_framework_version"
          />
        </Box>

        <Box htmlFor="target_framework_version" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='medium'>
            <label htmlFor="target_framework_version">Target Framework Version</label>
          </Box>
          <TextInput
            placeholder="Enter value"
            id="target_framework_version"
            name="target_framework_version"
          />
        </Box>

        {/* <Box data-testid="test-4" width="medium" margin="0" pad="small" >
          <Text>Source Code</Text> */}
        <Box htmlFor="source_code" direction='row' margin={{ bottom: 'medium' }}>
          <Box width='small'>
            <label htmlFor="source_code">Source Code*</label>
          </Box>

          <Box flex>
            <FileInput
              id="file_name"
              name="file_name"
              // label="Source code*"
              // value={inputValue}
              accept=".zip"
              messages={{
                dropPrompt: 'Drag and drop',
                browse: numFiles > 0 ? 'Replace file' : 'Select file',
              }}
              disabled={fileInputDisabled}
              // disabled={fileInputDisabled && !languages.includes(showhide) }
              // required={location.state === null && languages.includes(showhide) && formValues.file_name  === null}
              required={formValues?.file_name ? false : true }
              // required={!formValues.file_name}
              onChange={(e, { files }) => {
                // saveFile(files)
                // setInputValue(e.target.value);
                setNumFiles(files.length);
              }}
              
              ref={file}
            />
             </Box>


        </Box>

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
