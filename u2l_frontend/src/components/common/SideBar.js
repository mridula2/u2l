import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Box, Button, Sidebar } from "grommet";
// import { Clock, Apps, Terminal, Chat, StatusUnknown } from 'grommet-icons';

const SideBar = () => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      direction="column"
      width='17vw'
      responsive={true}
    >
      <Button label="Code Assessment" href="/dashboard" style={styles.btn} width='large' />
    </Box>
  );
};

const styles = {
  btn: { textAlign: "left", marginTop: "10px"},
};
export default SideBar;
