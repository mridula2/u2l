import { Button, Box, ResponsiveContext, TextInput, Notification } from "grommet";
import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Search as SearchIcon } from "grommet-icons";
import ActivitiesNavigationalCards from "../components/cards/Card";
import FilteringTable from "../components/table/FilteringTable";
import AppHeader from "../components/navbars/AppHeader";
import SideBar from "../components/common/SideBar";
import ProjectService from "../api/ProjectService";
import AuthenticationUtils from "../utils/AuthenticationUtils";
// import dummyData from "../Views/dummyData";

export const DefaultButtonExample = () => <Button label="Default button" />;

const uploadFile = () => {
  console.log("Uploading file");
  // axios.post('https://localhost:5000/uploaded_file', uploadFile)
};

const mystyle = {
  width: "40px",
  height: "40px",
  backgroundColor: "#FFBC44",
  Type: "Initials",
  left: "1107",
  top: "1400",
  border: "24",
};

const StyledTextInput = styled(TextInput).attrs(() => ({
  "aria-labelledby": "search-icon",
}))``;

export const SearchExample = ({ ...props }) => {
  const [value, setValue] = React.useState();

  return (
    <StyledTextInput
      icon={<SearchIcon id="search-icon" />}
      placeholder="Search"
      reverse
      value={value}
      onChange={(event) => setValue(event.target.value)}
      type="search"
      {...props}
    />
  );
};

const Dashboard = (containerRef) => {
  const [showModal, setShowModal] = useState(false);
  const [showPreference, setShowPreference] = useState(false);
  const [javaPreferences, setJavaPreferences] = useState(false);
  const [selected, setSelected] = useState("");
  const size = useContext(ResponsiveContext);
  const [numFiles, setNumFiles] = useState(0);
  const onSubmit = ({ value, touched }) => {};
  const [show, setShow] = useState(false);
  const [showspinner, setShowspinner] = useState("");
  const [projects, setProjects] = useState([]);
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [status,setStatus] = React.useState("normal");

  const onNotificationOpen = () => {
    setNotificationVisible(true);
  };
  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  useEffect(() => {
    ProjectService.getProjects(AuthenticationUtils.getEmail())
      .then((response) => {
        // response.data
        console.log(response);
        setProjects(response.data.project_details);
      })
      .catch((error) => {
        console.log(error);
        setNotificationMessage("Error while fetching projects");
        setStatus("critical")
        setNotificationVisible(true);
      });
  }, []);

  const image = {
    width: "100%",
    height: "100%",
  };

  return (
    <Box responsive={true} flex="shrink">
      <Box align="center" gap="small">
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
      {/* <AppHeader data-testid="appheader" /> */}
      <Box direction="row-responsive" responsive={true} flex="shrink">
        <SideBar data-testid="sidebar" />
        <Box
          direction="column"
          data-testid="test-1"
          margin="medium"
          responsive={true}
          style={image}
          flex="shrink"
        >
          <Box direction="row" margin="small" gap="large" responsive={true}>
            <Box>
            <ActivitiesNavigationalCards projects={projects}/>
            </Box>
            
          </Box>

          <Box margin={{ top: "10px" }}>
            <FilteringTable projects={projects}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
