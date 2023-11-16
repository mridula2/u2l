import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Notification } from 'grommet';
import { FormClose } from 'grommet-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import url from '../config/url';
import AuthenticationUtils from '../utils/AuthenticationUtils';
import CommonUtils from '../utils/CommonUtils';
import ProjectUtils from '../utils/ProjectUtils';
import statusIcons from '../config/constants';
import ProjectService from '../api/ProjectService';

const LogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [logs, setLogs] = useState(null);

  const onNotificationOpen = () => {
    setNotificationVisible(true);
  };
  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  const [data, setData] = useState('Initializing.....') //added on 18/10/2023

  useEffect(() => {

    //   const fetchData = () => {ProjectService.getLogs(AuthenticationUtils.getEmail())
    //      .then((response) => {
    //        // response.data
    //        console.log("response.data.project_details ::" , response.data.project_details);
    //        setLogs(response.data.project_details);
    //      })
    //      .catch((error) => {
    //        console.log(error);
    //        setNotificationMessage('Error while fetching projects');
    //        setNotificationVisible(true);
    //      });   
    //  }

    //  fetchData();
    //    const intervalId = setInterval(fetchData, 30000);

    //    return () => clearInterval(intervalId);
    // }, []);



    ///////////////////////////////////// added on 18/10/2023

    const sse = new EventSource(url + '/stream')

    function handleStream(e) {
      console.log(e)
      setData(e.data)
    }

    sse.onemessage = e => { handleStream(e) }

    sse.onerror = e => {
      sse.close()
    }

    return () => {
      sse.close()
    }
  },); ///////////////////////////////////// added on 18/10/2023

  const projectDetails = location.state.data;

  // const downloadReport = async () => {
  //   try {
  //     setLoading(true);
  //     const url_backend = url;
  //     const response = await fetch(
  //       `${url_backend}/report/${projectDetails.project_name}/${projectDetails.application_name
  //       }/${AuthenticationUtils.getEmail()}`,
  //       {
  //         method: 'GET',
  //       }
  //     );

  //     CommonUtils.downloadFile(response, projectDetails.project_name);
  //     setLoading(false);
  //     setSuccess(true);
  //     setTimeout(() => setSuccess(false), 2000);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const downloadReport = async () => {
    ProjectService.getReport(projectDetails.project_name,projectDetails.application_name,AuthenticationUtils.getEmail()).then(
      (response) => {
        CommonUtils.downloadFileAxios(response, projectDetails.project_name);
        // console.log(fileName + ' downloaded');
        setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const returnDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      width='80%'
      margin='10%'
      // alignContent="center"
      // border="all"
      direction='column'
    >
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
      <Box align='end'>
        <Button tip='Close' icon={<FormClose />} onClick={returnDashboard} />
      </Box>
      <h3>Log Details</h3>
      <Box direction='row' width='80%' height='60%' pad='10px'>
        <Box width='60%'>
          <h4>File Details</h4>
          <Text>File Name: {projectDetails.project_name} </Text>
          <Text>Project ID: {projectDetails.id}</Text>
          <Text>
            Status:{' '}
            {
              statusIcons[
              ProjectUtils.iconMapping(projectDetails.analysis_status)
              ]
            }{' '}
            {ProjectUtils.findSummary(projectDetails)}{' '}
          </Text>
          <Text>File Size: {projectDetails.file_size} kb</Text>
        </Box>
        <Box width='100%' border='all' margin='0 10' overflow='auto'>
          <h5>Data Import Logs</h5>
          {/* <Text>{projectDetails}</Text> */}
          <div>Streaming : {data} </div>   {/* added on 18/10/2023 */}


        </Box>
      </Box>
      <Box pad='20px' style={{ marginLeft: 'auto' }} direction='row' gap='20px'>
        <Button
          height='15px'
          width='small'
          border='all'
          label='Cancel'
          onClick={returnDashboard}
        ></Button>
        <Button
          onClick={downloadReport}
          height='50px'
          width='small'
          border='all'
          primary
          disabled={loading}
          label={'Download Report'}
          busy={loading}
          success={success}
        ></Button>
      </Box>
    </Box>
  );
};

export default LogDetails;
