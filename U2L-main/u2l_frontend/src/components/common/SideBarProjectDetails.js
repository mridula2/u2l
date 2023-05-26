import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Box, Button, Sidebar } from "grommet";

const SideBarProjectDeatils = () => {
  const theme = useContext(ThemeContext);

  return (
    <Box direction="column" width="small" responsive={true}>
      <Button label="Code Assessment" href="/dashboard" style={styles.btn} />
      <Button label="Project Details" href="/dashboard" style={styles.btn} />
      <Button label="OS Details" href="/dashboard" style={styles.btn} />
      <Button label="Analysis Type" href="/dashboard" style={styles.btn} />
      <Button label="Review" style={styles.btn} />
      <Button label="Review and Create" href="/review" style={styles.btn} />
    </Box>
  );
};

const styles = {
  btn: { width: "100%", textAlign: "left", marginTop: "10px", height: "7%" },
};
export default SideBarProjectDeatils;
