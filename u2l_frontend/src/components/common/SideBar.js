import React from "react";
import { Box, Button } from "grommet";

const SideBar = () => {

  return (
    <Box
      margin={{ top: "2%" }}
      direction="column"
      width='17vw'
      responsive={true}
    >
      <Button label="Code Assessment" href="/dashboard" style={styles.sideBarbtn} width='large' />
    </Box>
  );
};

const styles = {
  btn: { textAlign: "left", marginTop: "10px" },
  sideBarbtn: {
    display: 'flex', height: '6vh',
    alignItems: 'center', borderRadius: '0',
    borderBottom: '0.1px solid white', fontWeight: 'bold', background: '#0000000A 0% 0% no-repeat padding-box',
  },
};
export default SideBar;
