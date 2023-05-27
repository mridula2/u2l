import React from "react";
import PropTypes from "prop-types";
import { Box, Button, CardBody, CardFooter, Text } from "grommet";
import { Card } from "./CardTemplate";
import Success from "../../assets/Images/Success.png";
import Failed from "../../assets/Images/Failed.png";
import InProgress from "../../assets/Images/InProgress.png";
import TotalAssessment from "../../assets/Images/TotalAssessment.png";
// import dummyData from "../../Views/dummyData";

// const data = dummyData;

const columns = {
  xsmall: ["auto"],
  small: ["auto"],
  medium: ["auto"],
  large: ["auto", "auto"],
  xlarge: ["auto", "auto", "auto"],
};

const SelectionSummary = (props) => {
  return (
    <Box direction="row" gap="xxsmall">
      <Text size="large" weight="bold">
        {props.length}
      </Text>
      <Text></Text>
    </Box>
  );
};

SelectionSummary.propTypes = {
  selected: PropTypes.array,
};

const ActivitiesNavigationalCards = ({ heading = true, projects }) => {
  // const breakpoint = useContext(ResponsiveContext);

  const totalLength = () => {
    return projects.length;
  };
  
  const inProgress = () => {
    return projects.filter((e) =>
      e.analysis_status.toLowerCase().includes("inProgress")
    ).length;
  };

  const okLength = () => {
    return projects.filter((e) =>
      e.analysis_status.toLowerCase().includes("successful")
    ).length;
  };

  const criticalLength = () => {
    return projects.filter((e) =>
      e.analysis_status.toLowerCase().includes("failed")
    ).length;
  };

  return (
    <Box gap="medium" direction="row">
      <Card width="260px" height="80px" title="Title" description="description">
        <Box direction="row" gap="60%" margin={{ bottom: "small" }}>
          <Box direction="row" pad="20px" width="20%">
            <img
              src={TotalAssessment}
              style={{ height: 20, width: 20 }}
              alt="totalassesment"
            />
          </Box>
          <Box margin={{ top: "small" }}>
            <SelectionSummary length={totalLength()} />
          </Box>
        </Box>
        <Box align="end" pad="small">
          <Text level={4}>Total Assessment</Text>
        </Box>
      </Card>

      <Card width="260px" height="80px" title="Title" description="description">
        <Box direction="row" gap="60%" margin={{ bottom: "small" }}>
          <Box direction="row" pad="20px" width="20%">
            <img
              src={InProgress}
              style={{ height: 20, width: 20 }}
              alt="inprogress"
            />
          </Box>
          <Box margin={{ top: "small" }}>
            <SelectionSummary length={inProgress()} />
          </Box>
        </Box>
        <Box align="end" pad="small">
          <Text level={4}>In Progress</Text>
        </Box>
      </Card>

      <Card width="260px" height="80px" title="Title" description="description">
        <Box direction="row" gap="60%" margin={{ bottom: "small" }}>
          <Box direction="row" pad="20px" width="20%">
            <img
              src={Success}
              style={{ height: 20, width: 20 }}
              alt="success"
            />
          </Box>
          <Box margin={{ top: "small" }}>
            <SelectionSummary length={okLength()} />
          </Box>
        </Box>
        <Box align="end" pad="small">
          <Text level={4}>Success</Text>
        </Box>
      </Card>

      <Card width="260px" height="80px" title="Title" description="description">
        <Box direction="row" gap="60%" margin={{ bottom: "small" }}>
          <Box direction="row" pad="20px" width="20%">
            <img src={Failed} style={{ height: 20, width: 20 }} alt="failed" />
          </Box>
          <Box margin={{ top: "small" }}>
            <SelectionSummary length={criticalLength()} />
          </Box>
        </Box>
        <Box align="end" pad="small">
          <Text level={4}>Failed</Text>
        </Box>
      </Card>
    </Box>
  );
};

ActivitiesNavigationalCards.propTypes = {
  heading: PropTypes.bool,
};

export default ActivitiesNavigationalCards;
