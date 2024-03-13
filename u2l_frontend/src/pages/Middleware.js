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
  FileInput,
} from 'grommet';
import { Compliance, Close, Checkmark, Java } from 'grommet-icons';

import SideBar from '../components/common/SideBar';
import Colors from '../config/colors';
import RulesService from '../api/RulesService';
import MiddlewareService from '../api/MiddlewareService';

const AddMiddlewareForm = ({
  closeLayer,
  setNotificationVisible,
  setNotificationMessage,
  setStatus,
}) => {
  const [formValues, setFormValues] = useState({
    tool_analysis_type: '',
    file_name: '',
  });
  const [numFiles, setNumFiles] = useState(0);

  const onSubmit = () => {
    // checkServerStatus(formValues.package_url);
    console.log(formValues);
    let data = new FormData();
    data.append('file_name', formValues.file_name[0]);
    data.append('tool_analysis_type', formValues.tool_analysis_type);
    setNotificationVisible(true);
    setNotificationMessage(
      `Extracting middleware please wait!`
    );
    setStatus('info');
    MiddlewareService.addMiddleware(data)
      .then((response) => {
        console.log(response)
        setNotificationVisible(true);
        setNotificationMessage(
          `Middleware added successfully`
        );
        setStatus('normal');
      }).catch((err) => {
        console.log(err);
        setNotificationVisible(true);
        setNotificationMessage(
          `Failed to add middlware`
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
        style={{ overflow: 'clip' }}
      >
        <Heading level={2} margin='none'>
          Add Middleware
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
          <FormField
            htmlFor="tool_analysis_type"
            name="tool_analysis_type"
            label="Upload a file"
            required
          ><Select
              placeholder='Analysis Type'
              id='tool_analysis_type'
              name='tool_analysis_type'
              options={[
                'Java',
                'Shell',
                'C',
                'C++',
                'Pro*C',
                'C/Pro*C',
                'C++/Pro*C',
              ]}
              required={true}
            />
          </FormField>
          <Box gap='small'>
            {/* <Text>
            An email to reset your password will be sent to the following
            address:
          </Text> */}
            <FormField
              htmlFor="file_name"
              name="file_name"
              label="Upload a file"
              required
            >
              <FileInput
                messages={{
                  dropPrompt: 'Drag and drop',
                  browse: numFiles > 0 ? 'Replace file' : 'Select file',
                }}
                id="file_name"
                onChange={(event, { files }) => setNumFiles(files.length)}
                accept='.zip'
                name="file_name"
              />
            </FormField>


            <Button
              label='Add Middlware'
              primary
              type='submit'
              margin={{ top: 'small' }}
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

const Middleware = () => {
  const [showAddMiddleware, setShowAddMiddleware] = useState(false);
  const [showJavaLibrariesRules, setShowJavaLibrariesRules] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [status, setStatus] = useState('unknown');

  const navigate = useNavigate();

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };
  const onAddMiddleware = () => {
    setShowAddMiddleware(!showAddMiddleware);
  };
  const onCloseMiddleware = () => {
    setShowAddMiddleware(false);
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
          onClick={onAddMiddleware}
        >
          <Compliance size='xlarge' color={Colors.primaryBrand} />
          <Header
            style={{ fontWeight: 'bold', fontSize: '24px' }}
            margin={{ top: 'medium' }}
          >
            Add Middleware
          </Header>
          <Box direction='row' margin={{ top: 'medium' }}>
            <Text>Click to add middleware</Text>
          </Box>
        </Card>

      </Box>

      <Box align='start' margin={{ top: 'medium', bottom: 'small' }}>
        {showAddMiddleware && (
          <Layer modal onClickOutside={onCloseMiddleware} onEsc={onCloseMiddleware}>
            <AddMiddlewareForm
              closeLayer={onCloseMiddleware}
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

export default Middleware;
