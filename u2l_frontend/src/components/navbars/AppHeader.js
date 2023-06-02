import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Header,
  ResponsiveContext,
  Text,
  Menu,
  Avatar,
  Nav,
} from 'grommet';
import {
  Hpe,
  Notification,
  HelpOption,
  Projects,
  Search,
  Link,
  Language,
} from 'grommet-icons';
import { useNavigate } from 'react-router-dom';

export const AppHeader = () => {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const headerLinks = [
    {
      label: 'Home',
      path: '/dashboard',
      onClick: () => { navigate(headerLinks[0].path) }
    
    },
    {
      label: 'Documentation',
      path: '/documentation',
      onClick: () => {
        navigate(headerLinks[1].path);
      },
    },
  ];

  const loginPageHeaderLinks = [
    {
      label: 'HPE GreenLake',
      path: 'https://www.hpe.com/emea_europe/en/greenlake.html',
      onClick: () => {
        window.location.replace(loginPageHeaderLinks[0].path);
      },
    },
    {
      label: 'Products',
      path: 'https://www.hpe.com/emea_europe/en/products.html',
      onClick: () => {
        window.location.replace(loginPageHeaderLinks[1].path);
      },
    },
    {
      label: 'Support',
      path: 'https://www.hpe.com/emea_europe/en/services.html',
      onClick: () => {
        window.location.replace(loginPageHeaderLinks[2].path);
      },
    },
    {
      label: 'Contact',
      path: 'https://www.hpe.com/uk/en/contact-hpe.html',
      onClick: () => {
        window.location.replace(loginPageHeaderLinks[3].path);
      },
    },
  ];

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocused]);

  const mystyle = {
    width: '40px',
    height: '40px',
    backgroundColor: '#FFBC44',
    Type: 'Initials',
    left: '1107',
    top: '1400',
    border: '24',
  };

  const name = 'Jalt Kohlar';

  const getInitials = function () {
    // const name = AuthenticationService.getUserName();
    let parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0].toUpperCase();
      }
    }
    return initials;
  };

  if (window.location.pathname === '/') {
    return (
      <Header margin={{ top: 'xsmall' }}>
        <Box direction='column' gap='none' margin={{ left: 'medium' }}>
          <Hpe color='plain' size='large' />
          <Box>
            <Text color='text-strong' size='medium' weight='bold'>
              Hewlett Packard
            </Text>
            <Text color='text-strong' size='medium'>
              Enterprise
            </Text>
          </Box>
        </Box>
        {!['xsmall', 'small'].includes(size) ? (
          <Nav direction='row' gap='small'>
            {loginPageHeaderLinks.map((item) => (
              <Button style={{ borderRadius: '0' }} label={item.label} key={item.label} href={item.path} />
            ))}
          </Nav>
        ) : (
          <Menu label='Menu' items={loginPageHeaderLinks} />
        )}
        <Box direction='row'>
          <Box margin={{ right: 'medium' }}>
            <Search />
          </Box>
          <Box margin={{ right: 'medium' }}>
            <a href='/projects'>
              <Projects />
            </a>
          </Box>
          <Box margin={{ right: 'medium' }}>
            <Language />
          </Box>
        </Box>
      </Header>
    );
  } else if (window.location.pathname === '/dashboard') {
    return (
      <Header
        fill='horizontal'
        pad={{ horizontal: 'medium', vertical: 'small' }}
        style={{
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
      >
        <Box direction='row' gap='medium' align='start' flex>
          <Box direction='row' gap='medium' align='start' margin='auto'>
            <Hpe size='medium' color='plain' />
            <Box>
              <Text color='text-strong' size='medium' weight='bold'>
                HPE U2L
              </Text>
            </Box>
          </Box>
          <Box
            direction='row'
            gap='medium'
            align='center'
            justify='center'
            flex
          >
            {!['xsmall', 'small'].includes(size) ? (
              <Nav direction='row' gap='small'>
                {headerLinks.map((item) => (
                  <Button
                    label={item.label}
                    key={item.label}
                    href={item.path}
                    style={{ borderRadius: '0' }}
                  />
                ))}
              </Nav>
            ) : (
              <Menu label='Menu' items={headerLinks} />
            )}
          </Box>
          <Box
            direction='row'
            gap='medium'
            align='end'
            justify='end'
            margin='auto'
          >
            <Button href='/notifications'>
              <Notification
                style={{ width: '100%', height: 20 }}
              ></Notification>
            </Button>
            <Button href='/help'>
              <HelpOption style={{ width: '100%', height: 20 }}></HelpOption>
            </Button>
            <Button href='/dashboard'>
              <Projects style={{ width: '100%', height: 20 }}></Projects>
            </Button>
            <Button>
              <Avatar style={mystyle}>{getInitials()}</Avatar>
            </Button>
          </Box>
        </Box>
      </Header>
    );
  }
};

export default AppHeader;
