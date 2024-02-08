import React from 'react';
import { Box, Button } from 'grommet';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  // return (
  //   <Box
  //     margin={{ top: '2%' }}
  //     direction='column'
  //     width='17vw'
  //     responsive={true}
  //   >
  //     <Button
  //       label='Code Assessment'
  //       href='/dashboard'
  //       style={styles.sideBarbtn}
  //       width='large'
  //       active={window.location.pathname === '/dashboard' ? true : undefined}
  //     />
  //   </Box>
  // )

  const dahsboardSideBarLinks = [
    {
      label: 'Code Assessment',
      path: '/dashboard',
      onClick: () => {
        navigate(sideBarLinks[0].path);
      },
    },

    {
      label: 'Project Details',
    },

    {
      label: 'OS Details',
    },

    {
      label: 'Analysis Type',
    },

    {
      label: 'Review',
    },
  ];

  const sideBarLinks = [
    {
      label: 'Code Assessment',
      path: '/dashboard',
      onClick: () => {
        navigate(sideBarLinks[0].path);
      },
    },

    {
      label: 'Project Details',
      path: '/wizard',
    },

    {
      label: 'OS Details',
      path: '/wizard',
    },

    {
      label: 'Analysis Type',
      path: '/wizard',
    },

    {
      label: 'Review',
    },
  ];

  if (window.location.pathname === '/dashboard') {
    return (
      <Box
        margin={{ top: '2%' }}
        direction='column'
        width='17vw'
        responsive={true}
      >
        {/* <Button
        label='Code Assessment'
        href='/dashboard'
        style={styles.sideBarbtn}
        width='large'
        active={window.location.pathname === '/dashboard' ? true : undefined}
      /> */}

        {dahsboardSideBarLinks.map((item) => (
          <Button
            label={item.label}
            key={item.label}
            href={item.path}
            style={{ borderRadius: '0', textAlign: 'left' }}
            active={window.location.pathname === item.path ? true : undefined}
            disabled={item.path === '/dashboard' ? undefined : true}
          />
        ))}
      </Box>
    );
  }
};

const styles = {
  btn: { textAlign: 'left', marginTop: '10px' },
  sideBarbtn: {
    display: 'flex',
    height: '6vh',
    alignItems: 'center',
    borderRadius: '0',
  },
};
export default SideBar;
