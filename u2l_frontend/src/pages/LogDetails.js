import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Text, Notification, Meter } from 'grommet';
import { Copy, Download, FormClose } from 'grommet-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';

import url from '../config/url';
import statusIcons from '../config/constants';
import Colors from '../config/colors';
import AuthenticationUtils from '../utils/AuthenticationUtils';
import CommonUtils from '../utils/CommonUtils';
import ProjectUtils from '../utils/ProjectUtils';
import ProjectService from '../api/ProjectService';
import './LogDetails.css';

const LogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [logs, setLogs] = useState([]);
  const [successState, setSuccessState] = useState();
  const logRef = useRef(null);
  const onNotificationOpen = () => {
    setNotificationVisible(true);
  };
  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  const [progressPercent, setProgressPercent] = useState();

  const projectDetails = location.state.data;
  useEffect(() => {
    const url_backend = url;
    const sse = new EventSource(`/stream_logs/${projectDetails.task_id}`);

    const handleStream = (e) => {
      // ['### CODE ASSESSMENT STARTED ###', 'Tool Installation Completed.',
      // 'Executing U2LTool_Analysis.sh script', 'Completed executing U2LTool_Analysis.sh']
      // console.log(typeof(e.data));
      // Replace single quotes with double quotes

      const data = JSON.parse(e.data);
      console.log(data);

      // var correctedStr = data.logs.replace(/'/g, '"');
      // var correctedStr = e.data.replace(/'/g, '"');

      // Parse the corrected string into an array
      // var array = JSON.parse(correctedStr);

      // console.log(array);
      setLogs(data.logs);
      setProgressPercent(data.progress);
      if (data.progress == 100) {
        setSuccessState(true);
      }
    };

    sse.onmessage = (e) => {
      handleStream(e);
    };

    sse.onerror = (e) => {
      console.log('Error occured.');
      sse.close();
    };

    // sse.addEventListener(
    //   'open',
    //   function (event) {
    //     console.log('Connection was opened.', event.readyState);

    //     setInterval(() => {
    //       sse.send('ping');
    //     }, 3000);
    //   },
    //   false
    // );

    sse.addEventListener('end', function () {
      console.log('Closing SSE connection upon server request.');
      sse.close();
    });

    return () => {
      sse.close();
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // const downloadReport = async () => {
  //   const token = AuthenticationUtils.getToken();
  //   if (token) {
  //     try {
  //       setLoading(true);
  //       const url_backend = url;
  //       const response = await fetch(
  //         `${url_backend}/report/${projectDetails.project_name}/${
  //           projectDetails.application_name
  //         }/${AuthenticationUtils.getEmail()}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       CommonUtils.downloadFile(response, projectDetails.project_name);
  //       setLoading(false);
  //       setSuccess(true);
  //       setTimeout(() => setSuccess(false), 2000);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // const downloadReport = async () => {
  //   ProjectService.getReport(
  //     projectDetails.project_name,
  //     projectDetails.application_name,
  //     AuthenticationUtils.getEmail()
  //   )
  //     .then((response) => {
  //       CommonUtils.downloadFileAxios(response, projectDetails.project_name);
  //       // console.log(fileName + ' downloaded');

  //       setLoading(false);
  //       setSuccess(true);
  //       setTimeout(() => setSuccess(false), 2000);
  //     })
  //     .catch((error) => {
  //       setNotificationVisible(true);
  //       setNotificationMessage('error while downloading report');
  //     });
  // };

  const copyToClipboard = () => {
    const modifiedData = logs.toString().replaceAll(',', '\n');
    // console.log(modifiedData);
    navigator.clipboard.writeText(modifiedData);
  };

  const downloadLogs = () => {
    const modifiedData = logs.toString().replaceAll(',', '\n');
    JSON.stringify(modifiedData);
    const txtFile = new Blob([modifiedData], { type: 'text/plain' });
    const url = URL.createObjectURL(txtFile);
    const link = document.createElement('a');
    link.download = `Logs_${projectDetails.project_name}_${projectDetails.application_name}`;
    link.href = url;
    link.click();
    link.remove();
  };

  const returnDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box width='80%' margin={{ left: '10%', top: '5px' }} direction='column'>
      <Box align='center' gap='small'>
        {notificationVisible && (
          <Notification
            toast
            time={4000}
            // status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>
      <Box align='end' direction='row' justify='between'>
        <Text size='25px' style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          Log Details
        </Text>
        <Button tip='Close' icon={<FormClose />} onClick={returnDashboard} />
      </Box>
      <Box width='80%' height='60%' pad='10px'>
        <Box direction='row' flex='grow'>
          <Box direction='column' style={{ minWidth: '300px', width: '300px' }}>
            <Box direction='row' justify='between' width={'80%'}>
              <Meter
                margin={{ top: '3%' }}
                values={[
                  {
                    value: progressPercent,
                    label: 'progress',
                    onClick: () => {},
                    color: `${Colors.primaryBrand}`,
                  },
                ]}
                background='dark-2'
                aria-label='meter'
                // type={'circle'}
                // size={'xsmall'}
                // thickness='small'
              />
              <Text style={{ alignSelf: 'end', paddingLeft: '5%' }}>
                {progressPercent}%
              </Text>
            </Box>
            <h4>File Details</h4>
            <Text>File Name: {projectDetails.project_name} </Text>
            <Text>Project ID: {projectDetails.id}</Text>
            {!successState && (
              <Text>
                Status:{' '}
                {
                  statusIcons[
                    ProjectUtils.iconMapping(projectDetails.analysis_status)
                  ]
                }{' '}
                {ProjectUtils.findSummary(projectDetails)}{' '}
              </Text>
            )}
            {successState && (
              <Text>
                Status: {statusIcons[ProjectUtils.iconMapping('SUCCESS')]}{' '}
                {'Successful Assessment'}{' '}
              </Text>
            )}
            <Text>
              File Size: {CommonUtils.getSize(projectDetails.file_size)}
            </Text>
          </Box>
          <Box direction='column' margin={{ left: '10%' }}>
            <Box
              direction='row'
              style={{
                maxHeight: '40px',
                minHeight: '40px',
                backgroundColor: 'grey',
                maxWidth: '550px',
                minWidth: '550px',
                justifyContent: 'between',
                borderBottom: '1px solid white',
              }}
            >
              <h5
                style={{
                  color: 'white',
                  fontSize: '16px',
                  margin: '10px 15px 4px',
                  fontWeight: 'bold',
                }}
              >
                Data Import Logs
              </h5>
              <Box direction='row'>
                <Button
                  icon={<Download color='white' />}
                  onClick={downloadLogs}
                  tip={'Download'}
                  margin={{ right: '10px' }}
                  style={{ borderRadius: '0px' }}
                />
                <Button
                  icon={<Copy color='white' />}
                  onClick={copyToClipboard}
                  tip={'Copy'}
                  margin={{ right: '10px' }}
                  style={{ borderRadius: '0px' }}
                />
              </Box>
            </Box>
            <Box
              width='100%'
              border='all'
              style={{
                maxHeight: '400px',
                overflow: 'auto',
                minHeight: '400px',
                backgroundColor: 'black',
                maxWidth: '550px',
                minWidth: '550px',
              }}
              id='logs'
            >
              {logs?.map((log, index) => (
                <Text
                  key={index}
                  style={{
                    color: 'white',
                    fontSize: '14px',
                    margin: '4px 15px 4px',
                  }}
                >
                  {`log > ${log}`}
                </Text>
              ))}
              <Box ref={logRef} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        pad='20px'
        style={{ marginLeft: 'auto', marginRight: '40px' }}
        direction='row'
        gap='20px'
      >
        <Button
          height='15px'
          width='small'
          border='all'
          label='Cancel'
          secondary
          onClick={returnDashboard}
        ></Button>
        {/* <Button
          onClick={downloadReport}
          height='50px'
          width='small'
          border='all'
          primary
          disabled={loading}
          label={'Download reports'}
          busy={loading}
          success={success}
        ></Button> */}
      </Box>
    </Box>
  );
};

export default LogDetails;
