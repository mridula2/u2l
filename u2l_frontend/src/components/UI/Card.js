import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Heading,
  Grid,
  ResponsiveContext,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
} from "grommet";
import { Card } from "./CardTemplate";
// import { activities } from './data';
import { ReactComponent as Card1IMG } from "../../Images/Group101.svg";
import { ReactComponent as Card3IMG } from "../../Images/Group102.svg";
import { ReactComponent as Card2IMG } from "../../Images/Group103.svg";
// import serverhealth from "../UI/DataTable/FilterServers/serverhealth.json";
import dummyData from "../../config/dummyData";

const data = dummyData;

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
  
  const okLength = () => {
    return projects.filter((e) => e.analysis_status.toLowerCase().includes("successful")).length;
  };
  
  const criticalLength = () => {
    return projects.filter((e) => e.analysis_status.toLowerCase().includes("failed"))
      .length;
  };

  return (
    <Box gap="medium" direction="row">
      {/* <Grid columns={columns[breakpoint]} gap="medium"> */}
      <Card
        width="260px"
        height="102px"
        // key={index}
        // icon={activity.icon}
        title="Title"
        description="description"
        // actions={<Button label="Label" href="#" secondary />}
      >
        {/* <CardHeader justify="end" level={1} margin="0">  */}
        <Box direction="row" pad="20px" gap="150px">
          <Card1IMG />
          <h2 color="grey">
            <SelectionSummary length={totalLength()} />
          </h2>
        </Box>
        {/* </CardHeader> */}
        <CardFooter justify="end">Total Projects</CardFooter>
      </Card>

      <Card
        width="260px"
        height="102px"
        // key={index}
        // icon={activity.icon}
        title="Title"
        description="description"
        actions={<Button label="Label" href="#" secondary />}
        level={3}
      >
        <Box direction="row" pad="20px" gap="150px">
          <Card2IMG />
          <h2>
            <SelectionSummary length={okLength()} />
          </h2>
        </Box>
        {/* </CardHeader> */}
        <CardFooter justify="end">Successful Validation</CardFooter>
      </Card>

      <Card
        width="260px"
        height="102px"
        // key={index}
        // icon={activity.icon}
        title="Title"
        description="description"
        actions={<Button label="Label" href="#" secondary />}
        level={3}
      >
        <Box direction="row" pad="20px" gap="150px">
          <Card3IMG />
          <h2>
            <SelectionSummary length={criticalLength()} />
          </h2>
        </Box>
        {/* </CardHeader> */}
        <CardFooter justify="end">Total Error</CardFooter>
      </Card>

      {/* </Grid> */}
    </Box>
  );
};

ActivitiesNavigationalCards.propTypes = {
  heading: PropTypes.bool,
};

export default ActivitiesNavigationalCards;
