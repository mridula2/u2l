

import { Header, Button, Text, Box, Avatar } from "grommet";
import { useContext, useState } from "react";
import { Hpe, Notification, HelpOption, Projects } from "grommet-icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import AuthenticationService from "../../config/AuthenticationService";

const AppHeader = () => {
  // const size = useContext(ResponsiveContext);
  const navigate = useNavigate();

  const mystyle = {
    width: "40px",
    height: "40px",
    backgroundColor: "#FFBC44",
    Type: "Initials",
    left: "1107",
    top: "1400",
    border: "24",
  };

  //  const [name,setName] = useState("");
   
  
  //get name from signin page
  //GET Method
  // const name = "Jalt Kohlar";

  const getInitials = function () {
    const name = AuthenticationService.getUserName();
    let parts = name.split(" ");
    let initials = "";
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0].toUpperCase();
      }
    }
    return initials;
  };

  // alert(getInitials(name));

  const notificationpage = () => {
    <a> href="/notifications" </a>;
  };

  return (
    <Header pad='12px' border={{ side: "bottom", color: "border-weak" }} width='98%' margin='0 auto'>
      <Box
        direction="row"
        gap="medium"
        align="start"
        flex
        // border={{ side: "bottom", color: "border-weak" }}
      >
        <Box direction="row" gap="medium" align="start" margin='auto'>
          <Hpe size="medium" color="plain" />
          <Box>
            <Text color="text-strong" size="medium" weight="bold">
            HPE Code Assessment Suite
            </Text>
          </Box>
        </Box>
        <Box
          direction="row"
          gap="medium"
          align="center"
          justify="center"
          flex
        ></Box>
        <Box direction="row" gap="medium" align="end" justify="end" margin='auto'>
          <Button href="/notifications">
            <Notification style={{ width: "100%", height: 20 }}></Notification>
          </Button>
          <Button href="/help">
            <HelpOption style={{ width: "100%", height: 20 }}></HelpOption>
          </Button>
          <Button href="/dashboard">
            <Projects style={{ width: "100%", height: 20 }}></Projects>
          </Button>
          <Button>
            <Avatar style={mystyle}>{getInitials()}</Avatar>
          </Button>
        </Box>
      </Box>

    </Header>
  );
};

export default AppHeader;
