import React, { Component } from "react";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  Grid,
  Text,
  ResponsiveContext,
} from "grommet";
import { FormClose, Notification } from "grommet-icons";
import { hpe } from "grommet-theme-hpe";
import AppHeader from "./components/UI/AppHeader";
import AppRouting from "./routes/AppRouting";
import SideBar from "./components/UI/SideBar";

// const AppBar = (props) => (
//   <Box
//     tag="header"
//     direction="row"
//     align="center"
//     justify="between"
//     background="brand"
//     pad={{ left: "medium", right: "small", vertical: "small" }}
//     elevation="medium"
//     style={{ zIndex: "1" }}
//     {...props}
//   />
// );

class App extends Component {
  // state = {
  //   showSidebar: true,
  // };

  render() {
    // const { showSidebar } = this.state;

    return (
      <Grommet theme={hpe} full>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box fill >
              {/* {pad="medium"} */}
              {/* <AppHeader /> */}

              {/* <Box direction="row" flex overflow={{ vertical: "scroll" }}> */}
              {/* <SideBar/> */}

              {/* <hr /> */}

              <Box flex align="left" justify="start">
                <AppRouting />
              </Box>
              {/* </Box> */}
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
