import React, { useEffect, useState } from "react";
import {
  Anchor,
  Box,
  Button,
  DataTable,
  ResponsiveContext,
  Text,
  Layer,
  Heading,
  FormField,
} from "grommet";
import { FormClose } from "grommet-icons";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectService from "../config/ProjectService";
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from "grommet-icons";
import FileDownload from 'js-file-download'
import url_b from "../config/url";

const statusIcons = {
  Warning: <StatusWarningSmall color="status-warning" size="small" />,
  OK: <StatusGoodSmall color="status-ok" size="small" />,
  Critical: <StatusCriticalSmall color="status-critical" size="small" />,
  Unknown: <StatusUnknownSmall color="status-unknown" size="small" />,
};

const LogDetails = () => {
  const [data,setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //   setData(location.state.data)
  // },[])

  const findSummary = (datum) => {
    if (datum.analysis_status === "analysis unknown") {
      return "In Progress";
    } else if (datum.analysis_status === "analysis successful") {
      return "Successful Assessment";
    } else if (datum.analysis_status === "analysis failed") {
      return "Failed Assessment";
    }
  };

  const iconMapping = (analysis_status) => {
    if(analysis_status === "analysis successful"){
      return "OK";
    } else if (analysis_status === "analysis failed"){
      return "Critical";
    } else  if (analysis_status === "analysis unknown") {
      return "Unknown";
    }
  }

  const downloadReport = async () => {
  try {
    setLoading(true); 
    const url_backend = url_b
    const response = await fetch(`${url_backend}/report/${location.state.data.project_name}`, {
      method: 'GET',
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'files.zip');
    document.body.appendChild(link);
    link.click();
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
  };

  const returnDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <Box
      width="80%"
      margin="10%"
      // alignContent="center"

      // border="all"
      direction="column"
    >
      <Box align="end">
              <Button icon={<FormClose />} onClick={returnDashboard} />
            </Box>
      <h3>Log Details</h3>
      <Box direction="row" width="80%" height="60%" pad="10px">
        <Box width="60%">
          <h4>File Details</h4>
          <Text>File Name: {location.state.data.project_name} </Text>
          <Text>Project ID: {location.state.data.id}</Text>
          <Text>Status: {statusIcons[iconMapping(location.state.data.analysis_status)]} {findSummary(location.state.data)} </Text>
          <Text>File Size: {location.state.data.file_size} mb</Text>
        </Box>
        <Box width="100%" border="all" margin="0 10" overflow="auto">
          <h5>Data Import Logs</h5>
          <Text>Development in progress</Text>
        </Box>
      </Box>
      <Box pad="20px" style={{ marginLeft: "auto" }} direction="row" gap="20px">
        <Button
          height="15px"
          width="small"
          border="all"
          label="Cancel"
          onClick={returnDashboard}
        ></Button>
        <Button
          onClick={downloadReport}
          height="50px"
          width="small"
          border="all"
          primary
          disabled={loading}
          label={loading ? 'Downloading...' : 'Download Report'}
        ></Button>
      </Box>
    </Box>
  );
};

export default LogDetails;
