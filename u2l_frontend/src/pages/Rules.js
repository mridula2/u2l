import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  Header,
  Layer,
  Button,
  Heading,
  Form,
  Text,
  FormField,
  TextInput,
  Select,
  Notification,
  RangeInput,
} from 'grommet';
import { Compliance, Close, Checkmark, Java } from 'grommet-icons';

import SideBar from '../components/common/SideBar';
import Colors from '../config/colors';
import RulesService from '../api/RulesService';

const AddRulesForm = ({
  closeLayer,
  setNotificationVisible,
  setNotificationMessage,
  setStatus,
}) => {
  const language = [
    'Java',
    'Shell',
    'C',
    'C++',
    'Pro*C',
    'C/Pro*C',
    'C++/Pro*C',
  ];
  const [formValues, setFormValues] = useState({
    package_language: '',
    package_url: '',
    package_name: '',
    package_version: '',
  });
  const [packageLang, setPackageLang] = useState('Java');
  const [isServerReachable, setIsServerReachable] = useState(false);

  const handleshowhide = (event) => {
    const getLang = event.target.value;
    setPackageLang(getLang);
  };

  const checkServerStatus = () => {
    RulesService.checkURL().then((response) => {
      if (response.status === 200) {
        setIsServerReachable(true);
      } else {
        setIsServerReachable(false);
      }
    });
  };
  const onSubmit = () => {
    console.log(formValues);

    // checkServerStatus();
    // // console.log(check);
    // setNotificationVisible(true);
    // setNotificationMessage(`Checking server status`);
    // setStatus('info');
    // if (isServerReachable) {
    //   // API call
    //   setNotificationVisible(true);
    //   setNotificationMessage(
    //     `Adding rules for package ${formValues.packageName}`
    //   );
    //   setStatus('info');
    //   RulesService.addRules(formValues)
    //     .then((response) => {
    //       console.log(response);
    //       setNotificationVisible(true);
    //       setNotificationMessage(
    //         `Rules for package ${formValues.packageName} added successfully`
    //       );
    //       setStatus('normal');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setNotificationVisible(true);
    //       setNotificationMessage(
    //         `Failed to add rules for package ${formValues.packageName}`
    //       );
    //       setStatus('critical');
    //     });
    // } else {
    //   setNotificationVisible(true);
    //   setNotificationMessage(`Website is not reachable!`);
    //   setStatus('critical');
    // }
    RulesService.addRules(formValues)
      .then((response) => {
        console.log(response);
        setNotificationVisible(true);
        setNotificationMessage(
          `Rules for package ${formValues.package_name} added successfully`
        );
        setStatus('normal');
      })
      .catch((err) => {
        console.log(err);
        setNotificationVisible(true);
        setNotificationMessage(
          `Failed to add rules for package ${formValues.package_name}`
        );
        setStatus('critical');
      });
    closeLayer();
  };
  return (
    <Box>
      <Box
        direction='row'
        justify='end'
        pad={{ horizontal: 'small', top: 'small' }}
      >
        <Button a11yTitle='Close form' icon={<Close />} onClick={closeLayer} />
      </Box>
      <Box
        gap='medium'
        margin={{ horizontal: 'large', bottom: 'large', top: 'small' }}
        width='medium'
      >
        <Heading level={2} margin='none'>
          Add Rules
        </Heading>
        <Form
          validate='submit'
          value={formValues}
          messages={{
            required: 'This is a required field.',
          }}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method='post'
        >
          <Box gap='small'>
            {/* <Text>
            An email to reset your password will be sent to the following
            address:
          </Text> */}
            <FormField
              label='Language'
              htmlFor='package_language'
              name='package_language'
              required={true}
            >
              <Select
                placeholder='Languages'
                id='package_language'
                name='package_language'
                options={language}
                onChange={(e) => handleshowhide(e)}
              />
            </FormField>
            {packageLang !== 'Java' && (
              <>
                <Box>
                  <Box direction='row'>
                    <Box fill>
                      <FormField
                        label='URL'
                        htmlFor='package_url'
                        name='package_url'
                        // validate={emailValidation}
                        required={true}
                        // onBlur={checkServerStatus}
                        margin={{ right: 'small' }}
                      >
                        <TextInput
                          id='package_url'
                          name='package_url'
                          type='package_url'
                          placeholder='https://www.langdocs.com'
                        />
                      </FormField>
                    </Box>
                    <Box>
                      {!isServerReachable && (
                        <Close style={{ marginTop: '37px' }} color='red' />
                      )}
                      {isServerReachable && (
                        <Checkmark
                          color='green'
                          style={{ marginTop: '37px' }}
                        />
                      )}
                    </Box>
                  </Box>
                  {!isServerReachable && (
                    <Text color={'red'}>Please Enter valid url</Text>
                  )}
                </Box>
                <FormField
                  label='Package Name'
                  htmlFor='package_name'
                  name='package_name'
                  // validate={emailValidation}
                  required={true}
                >
                  <TextInput
                    id='package_name'
                    name='package_name'
                    type='text'
                    placeholder='Enter Package Name'
                  />
                </FormField>
              </>
            )}
            <FormField
              label='Version'
              htmlFor='package_version'
              name='package_version'
              // validate={emailValidation}
              required={true}
            >
              <TextInput
                id='package_version'
                name='package_version'
                type='number'
                placeholder='Version to be added'
                min={6}
                max={19}
              />
            </FormField>
            <Button
              label='Add Rules'
              primary
              type='submit'
              margin={{ top: 'small' }}
              // disabled={!isServerReachable}
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

const AddJavaLibrariesForm = ({
  closeLayer,
  setNotificationVisible,
  setNotificationMessage,
  setStatus,
}) => {
  const [formValues, setFormValues] = useState({
    package_name: '',
    package_version: '',
    package_url: '',
  });

  const packages = [
    'Angus Activation',
    'ECJ',
    'JavaHamcrest',
    'Mchange commons',
    'Micrometer Core',
    'okhttp',
    'zip4j',
    'Apache Tomcat',
    'Apache ANT',
    'aspectjweaver',
    'aspectjrt',
    'Axis',
    'Bouncycastle',
    'cglib-nodep',
    'Commons Beanutils',
    'Commons Configuration',
    'Commons Dbcp',
    'Commons Digester',
    'Commons Discovery',
    'Commons Lang',
    'Commons Collections',
    'Commons Codec',
    'Apache Commons',
    'Commons Pool',
    'Commons Logging',
    'Diffutils',
    'Geronimo',
    'Groovy-lang',
    'Hazelcast',
    'HTTPcore',
    'HTTPclient',
    'Imap',
    'IText',
    'Jasper Reports',
    'Jaxrpc',
    'Jcifs',
    'Jcommon',
    'Jdom',
    'Jfreechart',
    'Jsch Documentation',
    'Juddi Client',
    'Apache OpenJPA',
    'Mybatis',
    'Mybatis Spring',
    'Opencsv',
    'POI',
    'Quartz scheduler',
    'slf4j',
    'wsdl4j',
    'XMLBeans',
  ];
  const [isServerReachable, setIsServerReachable] = useState();
  const [options, setOptions] = useState(packages);

  const checkServerStatus = (url) => {
    RulesService.checkURL(url)
      .then((response) => {
        if (response.status === 200) {
          setIsServerReachable(true);
        } else {
          setIsServerReachable(false);
        }
        console.log(response);
      })
      .catch((error) => {
        setNotificationMessage('error');
        setNotificationVisible(true);
        setStatus('critical');
      });
  };

  const onSubmit = () => {
    // checkServerStatus(formValues.package_url);
    console.log(formValues);
    const checkURL =
      formValues.package_url !== null && formValues.package_url !== '';
    if (checkURL) {
      checkServerStatus(formValues.package_url);
    }
    setNotificationVisible(true);
    setNotificationMessage(`Checking server status`);
    setStatus('info');
    if ((checkURL && isServerReachable) || checkURL === false) {
      // API call
      setNotificationVisible(true);
      setNotificationMessage(
        `Adding Libraries for package ${formValues.package_name}`
      );
      setStatus('info');
      RulesService.addJavaLibraries(formValues)
        .then((response) => {
          // console.log(response);
          setNotificationVisible(true);
          setNotificationMessage(`Libraries added successfully`);
          setStatus('normal');
        })
        .catch((err) => {
          console.log(err);
          setNotificationVisible(true);
          setNotificationMessage(`Failed to add libraries`);
          setStatus('critical');
        });
    } else if (checkURL && !isServerReachable) {
      setNotificationVisible(true);
      setNotificationMessage(`Website is not reachable!`);
      setStatus('critical');
    }
    closeLayer();
  };
  return (
    <Box>
      <Box
        direction='row'
        justify='end'
        pad={{ horizontal: 'small', top: 'small' }}
      >
        <Button a11yTitle='Close form' icon={<Close />} onClick={closeLayer} />
      </Box>
      <Box
        gap='medium'
        margin={{ horizontal: 'large', bottom: 'large', top: 'small' }}
        width='medium'
        style={{ overflow: 'clip' }}
      >
        <Heading level={2} margin='none'>
          Add Java Libraries
        </Heading>
        <Form
          validate='submit'
          value={formValues}
          messages={{
            required: 'This is a required field.',
          }}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method='post'
        >
          <Box gap='small'>
            {/* <Text>
            An email to reset your password will be sent to the following
            address:
          </Text> */}
            <FormField
              label='Package Name'
              htmlFor='package_name'
              name='package_name'
              required={true}
            >
              <Select
                placeholder='Package Name'
                id='package_name'
                name='package_name'
                options={options}
                onClose={() => setOptions(packages)}
                onSearch={(text) => {
                  const escapedText = text.replace(
                    /[-\\^$*+?.()|[\]{}]/g,
                    '\\$&'
                  );
                  const exp = new RegExp(escapedText, 'i');
                  setOptions(packages.filter((o) => exp.test(o)));
                }}
              />
            </FormField>

            <Box>
              <Box direction='row'>
                <Box fill>
                  <FormField
                    label='URL'
                    htmlFor='package_url'
                    name='package_url'
                    // validate={emailValidation}
                    // required={true}
                    // onBlur={checkServerStatus}
                    margin={{ right: 'small' }}
                  >
                    <TextInput
                      id='package_url'
                      name='package_url'
                      type='package_url'
                      placeholder='https://www.langdocs.com'
                    />
                  </FormField>
                </Box>
                <Box>
                  {isServerReachable !== undefined &&
                    isServerReachable !== null &&
                    isServerReachable === false && (
                      <Close style={{ marginTop: '37px' }} color='red' />
                    )}
                  {isServerReachable && (
                    <Checkmark color='green' style={{ marginTop: '37px' }} />
                  )}
                </Box>
              </Box>
              {isServerReachable !== undefined &&
                isServerReachable !== null &&
                isServerReachable === false && (
                  <Text color={'red'}>Please Enter valid url</Text>
                )}
            </Box>

            <FormField
              label='Version'
              htmlFor='package_version'
              name='package_version'
              // validate={emailValidation}
              required={true}
            >
              <TextInput
                id='package_version'
                name='package_version'
                type='text'
                placeholder='Version to be added'
              />
            </FormField>
            <Button
              label='Add Rules'
              primary
              type='submit'
              margin={{ top: 'small' }}
              disabled={
                isServerReachable === null || isServerReachable === false
              }
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

const Rules = () => {
  const [showAddLanguageRules, setShowAddLanguageRules] = useState(false);
  const [showJavaLibrariesRules, setShowJavaLibrariesRules] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [status, setStatus] = useState('unknown');

  const navigate = useNavigate();

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };
  const onAddRules = () => {
    setShowAddLanguageRules(!showAddLanguageRules);
  };
  const onCloseRules = () => {
    setShowAddLanguageRules(false);
  };

  const onAddJavaLibraries = () => {
    setShowJavaLibrariesRules(!showJavaLibrariesRules);
  };
  const onCloseJavaLibraries = () => {
    setShowJavaLibrariesRules(false);
  };
  return (
    <Box direction='row'>
      <Box align='center' gap='small'>
        {notificationVisible && (
          <Notification
            toast
            time={4000}
            status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>
      <SideBar data-testid='sidebar' />
      <Box
        gap='medium'
        direction='row'
        align='start'
        style={{ minWidth: '70%' }}
        margin={{ top: 'large', left: 'large' }}
      >
        <Card
          pad='medium'
          width='27%'
          margin='small'
          height='35vh'
          style={{ cursor: 'pointer' }}
          onClick={onAddRules}
        >
          <Compliance size='xlarge' color={Colors.primaryBrand} />
          <Header
            style={{ fontWeight: 'bold', fontSize: '24px' }}
            margin={{ top: 'medium' }}
          >
            Add Rules
          </Header>
          <Box direction='row' margin={{ top: 'medium' }}>
            <Text>Click to add rules</Text>
          </Box>
        </Card>

        <Card
          pad='medium'
          width='27%'
          margin='small'
          height='35vh'
          style={{ cursor: 'pointer' }}
          onClick={onAddJavaLibraries}
        >
          <Java size='xlarge' color={Colors.primaryBlue400} />
          <Header
            style={{ fontWeight: 'bold', fontSize: '24px' }}
            margin={{ top: 'medium' }}
          >
            Add Java Libraries
          </Header>
          <Box direction='row' margin={{ top: 'medium' }}>
            <Text>Click to add rules</Text>
          </Box>
        </Card>
      </Box>

      <Box align='start' margin={{ top: 'medium', bottom: 'small' }}>
        {showAddLanguageRules && (
          <Layer modal onClickOutside={onCloseRules} onEsc={onCloseRules}>
            <AddRulesForm
              closeLayer={onCloseRules}
              setNotificationVisible={setNotificationVisible}
              setNotificationMessage={setNotificationMessage}
              setStatus={setStatus}
            />
          </Layer>
        )}
        {showJavaLibrariesRules && (
          <Layer
            modal
            onClickOutside={onCloseJavaLibraries}
            onEsc={onCloseJavaLibraries}
          >
            <AddJavaLibrariesForm
              closeLayer={onCloseJavaLibraries}
              setNotificationVisible={setNotificationVisible}
              setNotificationMessage={setNotificationMessage}
              setStatus={setStatus}
            />
          </Layer>
        )}
      </Box>
    </Box>
  );
};

export default Rules;
