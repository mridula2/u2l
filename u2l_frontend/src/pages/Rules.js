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
} from 'grommet';
import { Compliance, Close, Checkmark } from 'grommet-icons';

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
    language: '',
    url: '',
    packageName: '',
    version: '',
  });
  const [isServerReachable, setIsServerReachable] = useState(false);

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
    checkServerStatus();
    // console.log(check);
    setNotificationVisible(true);
    setNotificationMessage(`Checking server status`);
    setStatus('info');
    if (isServerReachable) {
      // API call
      setNotificationVisible(true);
      setNotificationMessage(
        `Adding rules for package ${formValues.packageName}`
      );
      setStatus('info');
      RulesService.addRules(formValues)
        .then((response) => {
          console.log(response);
          setNotificationVisible(true);
          setNotificationMessage(
            `Rules for package ${formValues.packageName} added successfully`
          );
          setStatus('normal');
        })
        .catch((err) => {
          console.log(err);
          setNotificationVisible(true);
          setNotificationMessage(
            `Failed to add rules for package ${formValues.packageName}`
          );
          setStatus('critical');
        });
    } else {
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
              htmlFor='language'
              name='language'
              required={true}
            >
              <Select
                placeholder='Languages'
                id='language'
                name='language'
                options={language}
              />
            </FormField>
            <Box>
              <Box direction='row'>
                <Box fill>
                  <FormField
                    label='URL'
                    htmlFor='url'
                    name='url'
                    // validate={emailValidation}
                    required={true}
                    // onBlur={checkServerStatus}
                    margin={{ right: 'small' }}
                  >
                    <TextInput
                      id='url'
                      name='url'
                      type='url'
                      placeholder='https://www.langdocs.com'
                    />
                  </FormField>
                </Box>
                <Box>
                  {!isServerReachable && (
                    <Close style={{ marginTop: '37px' }} color='red' />
                  )}
                  {isServerReachable && (
                    <Checkmark color='green' style={{ marginTop: '37px' }} />
                  )}
                </Box>
              </Box>
              {!isServerReachable && (
                <Text color={'red'}>Please Enter valid url</Text>
              )}
            </Box>
            <FormField
              label='Package Name'
              htmlFor='packageName'
              name='packageName'
              // validate={emailValidation}
              required={true}
            >
              <TextInput
                id='packageName'
                name='packageName'
                type='text'
                placeholder='Enter Package Name'
              />
            </FormField>
            <FormField
              label='Version'
              htmlFor='version'
              name='version'
              // validate={emailValidation}
              required={true}
            >
              <TextInput
                id='version'
                name='version'
                type='text'
                placeholder='Version to be added'
              />
            </FormField>
            <Button
              label='Add Rules'
              primary
              type='submit'
              margin={{ top: 'small' }}
              disabled={!isServerReachable}
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

const Rules = () => {
  const [showAddRules, setShowAddRules] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [status, setStatus] = useState('unknown');

  const navigate = useNavigate();

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };
  const onAddRules = () => {
    setShowAddRules(!showAddRules);
  };
  const onClose = () => {
    setShowAddRules(false);
  };
  return (
    <Box direction='row-responsive' responsive={true} flex='shrink'>
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
      </Box>
      <Box align='start' margin={{ top: 'medium', bottom: 'small' }}>
        {showAddRules && (
          <Layer modal onClickOutside={onClose} onEsc={onClose}>
            <AddRulesForm
              closeLayer={onClose}
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
