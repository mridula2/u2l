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
  Language,
} from 'grommet-icons';
import { Link, useNavigate } from 'react-router-dom';
import classes from './AppHeader.module.css';
import AuthenticationUtils from '../../utils/AuthenticationUtils';
                           
export const AppHeader = () => {
  const size = useContext(ResponsiveContext);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const headerLinks = [
    {
      label: 'Home',
      path: '/dashboard',
      onClick: () => {
        navigate(headerLinks[0].path);
      },
    },
    {
      label: 'Rules',
      path: '/rules',
      onClick: () => {
        navigate(headerLinks[1].path);
      },
    },
  ];
  AuthenticationUtils.getUserRole() !== 'Delivery' &&
    headerLinks.push({
      label: 'Documentation',
      path: '/documentation',
      onClick: () => {
        navigate(headerLinks[2].path);
      },
    });

  const loginPageHeaderLinks = [
    {
      label: 'Login',
      path: '/',
      onClick: () => {
        navigate(loginPageHeaderLinks[0].path);
      },
    },
    {
      label: 'Contact',
      path: '/contact',
      onClick: () => {
        navigate(loginPageHeaderLinks[1].path);
      },
    },
    {
      label: 'About us',
      path: '/aboutus',
      onClick: () => {
        navigate(loginPageHeaderLinks[2].path);
      },
    },
  ];

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocused]);

  // const mystyle = {
  //   width: '40px',
  //   height: '40px',
  //   backgroundColor: '#FFBC44',
  //   Type: 'Initials',
  //   left: '1107',
  //   top: '1400',
  //   border: '24',
  // };

  const getInitials = function () {
    const name = AuthenticationUtils.getUserName();
    const parts = name.split(' ');
    let initials = '';
    for (const element of parts) {
      if (element.length > 0 && element !== '') {
        initials += element[0].toUpperCase();
      }
    }
    return initials;
    // return "A A"
  };

  const navigateToPage = (page) => {
    navigate(page);
  };

  if (
    window.location.pathname === '/' ||
    window.location.pathname === '/aboutus' ||
    window.location.pathname === '/contact'
  ) {
    return (
      <Header
        margin={{ top: 'xsmall' }}
        style={{
          boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        }}
      >
        <Box
          direction='column'
          gap='none'
          margin={{ left: 'medium' }}
          style={{ cursor: 'pointer' }}
          focusIndicator={false}
          onClick={() => navigateToPage('/')}
        >
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
        <Box direction='row' align='center' justify='center'>
          {!['xsmall', 'small'].includes(size) ? (
            <Nav direction='row' gap='small'>
              {loginPageHeaderLinks.map((item) => (
                <Button
                  style={{ borderRadius: '0' }}
                  label={item.label}
                  key={item.label}
                  onClick={() => navigateToPage(item.path)}
                  active={window.location.pathname === item.path}
                  // disabled={window.location.pathname === item.path}
                />
              ))}
            </Nav>
          ) : (
            <Menu label='Menu' items={loginPageHeaderLinks} />
          )}
        </Box>
        <Box direction='row'>
          <Box margin={{ right: 'medium' }}>
            <Search />
          </Box>
          <Box margin={{ right: 'medium' }}>
            <Link to='/projects' aria-current='page'>
              <Projects />
            </Link>
          </Box>
          <Box margin={{ right: 'medium' }}>
            <Language />
          </Box>
        </Box>
      </Header>
    );
  } else if (
    window.location.pathname === '/dashboard' ||
    window.location.pathname === '/wizard' ||
    window.location.pathname === '/documentation' ||
    window.location.pathname === '/rules'
  ) {
    return (
      <Header
        fill='horizontal'
        pad={{ horizontal: 'medium', vertical: 'small' }}
        style={{
          boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        }}
      >
        <Box direction='row' gap='medium' align='start' flex>
          <Box
            direction='row'
            gap='small'
            align='center'
            margin='auto'
            focusIndicator={false}
            onClick={() => navigateToPage('/dashboard')}
          >
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
                    // href={item.path}
                    style={{ borderRadius: '0' }}
                    onClick={() => navigateToPage(item.path)}
                    active={window.location.pathname === item.path}
                    // disabled={window.location.pathname === item.path}
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
              <Notification style={{ width: '100%', height: 16 }} />
            </Button>
            <Button href='/help'>
              <HelpOption style={{ width: '100%', height: 17 }} />
            </Button>
            <Button href='/dashboard'>
              <Projects style={{ width: '100%', height: 17 }} />
            </Button>
            <Button>
              <Avatar className={classes.mystyle} size='30px'>
                <Text style={{ fontSize: '17px' }}>{getInitials()}</Text>
              </Avatar>
            </Button>
          </Box>
        </Box>
      </Header>
    );
  }
};

export default AppHeader;
