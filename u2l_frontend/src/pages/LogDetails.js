import React, { useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { FormClose } from 'grommet-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import url from '../config/url';
import AuthenticationUtils from '../utils/AuthenticationUtils';
import CommonUtils from '../utils/CommonUtils';
import ProjectUtils from '../utils/ProjectUtils';
import statusIcons from '../config/constants';

const LogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const projectDetails = location.state.data;

  const downloadReport = async () => {
    try {
      setLoading(true);
      const url_backend = url;
      const response = await fetch(
        `${url_backend}/report/${projectDetails.project_name}/${
          projectDetails.application_name
        }/${AuthenticationUtils.getEmail()}`,
        {
          method: 'GET',
        }
      );

      CommonUtils.downloadFile(response, projectDetails.project_name);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error(error);
    }
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
          <Text>Development in progress</Text>
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
