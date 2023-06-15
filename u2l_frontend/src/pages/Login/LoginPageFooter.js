import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext, Text, Anchor } from 'grommet';
import './LinkPage.css';

export const LoginPageFooter = () => {
  const size = useContext(ResponsiveContext);
  const year = new Date().getFullYear();

  const LoginPageFooterLinks = [
    {
      label: 'Privacy',
      hyperlink: 'https://www.hpe.com/emea_europe/en/legal/privacy.html',
    },
    {
      label: 'Terms of Use',
      hyperlink:
        'https://www.hpe.com/emea_europe/en/about/legal/terms-of-use.html',
    },
    {
      label: 'Ad Choices & cookies',
      hyperlink:
        'https://www.hpe.com/emea_europe/en/legal/privacy.html#datacollection',
    },
    {
      label: 'Sitemap',
      hyperlink: 'https://www.hpe.com/emea_europe/en/sitemap.html',
    },
  ];
  return (
    <Footer
      background='background-front'
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      fill='horizontal'
      margin={{ top: '20px' }}
    >
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
        gap='xsmall'
        className='LinkPage'
      >
        <Text size='medium' margin={{ left: '100px' }}>
          &copy; Copyright {year} Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box
        direction='row'
        align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
        gap='xsmall'
        wrap
        className='links'
        margin={{ right: '50px' }}
      >
        {LoginPageFooterLinks.map((link) => {
          return (
            <Box key={link.label}  margin={{ left: '40px' }}>
              <a href={link.hyperlink} id={link.label}>
                {link.label}
              </a>
            </Box>
          );
        })}
      </Box>
    </Footer>
  );
};

export default LoginPageFooter;
