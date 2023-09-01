import { Box, Card, Header } from 'grommet';
import SideBar from '../components/common/SideBar';
import { Download } from 'grommet-icons';
import url from '../config/url';
import { ReactComponent as Question } from '../assets/Images/Question.svg';
import { ReactComponent as Readdocs } from '../assets/Images/Readthedocs.svg';
import CommonUtils from '../utils/CommonUtils';
import { useState } from 'react';
import Colors from '../config/colors';

const Documentation = () => {
  const file1 = 'Code Delivery Guidelines-V0.4';
  const file2 = 'HPE U2L Questionnaire-light';
  const [mouseEnter1, setMouseEnter1] = useState();
  const [mouseEnter2, setMouseEnter2] = useState();

  const downloadfile = async (fileName) => {
    try {
      const url_backend = url;
      const response = await fetch(`${url_backend}/documentation/${fileName}`, {
        method: 'GET',
      });
      CommonUtils.downloadFile(response, fileName);
      console.log(fileName + ' downloaded');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box direction='row-responsive' responsive={true} flex='shrink'>
      <SideBar data-testid='sidebar' />
      <Box
        gap='medium'
        direction='row'
        align='start'
        style={{ minWidth: '70%' }}
        margin={{ top: 'large', left: 'large' }}
      >
        <Card
          pad={{ horizontal: 'small', vertical: 'medium' }}
          width='35%'
          margin='small'
          height='80%'
        >
          <Readdocs />
          <Header
            style={{ fontWeight: 'bold', fontSize: '24px' }}
            margin={{ top: 'small' }}
          >
            Code delivery guidelines
          </Header>
          <Box direction='row' style={{ fontSize: '15px' }}>
            <p>Guideline documentation for delivery code</p>
          </Box>
          <Box align='end'>
            <Download
              onClick={() => downloadfile(file1)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setMouseEnter1(true)}
              onMouseLeave={() => setMouseEnter1(false)}
              color={mouseEnter1 ? Colors.primaryBrand : undefined}
            />
          </Box>
        </Card>

        <Card
          pad={{ horizontal: 'small', vertical: 'medium' }}
          width='35%'
          margin='small'
          height='80%'
        >
          <Question size='xxlarge' />
          <Header
            style={{ fontWeight: 'bold', fontSize: '22px' }}
            margin={{ top: 'small' }}
          >
            HPE Unix to Linux migration
          </Header>
          <Header style={{ fontWeight: 'bold', fontSize: '22px' }}>
            questionnaire
          </Header>
          <Box direction='row' style={{ fontSize: '15px' }}>
            <p>Guideline documentation for delivery code</p>
          </Box>
          <Box align='end'>
            <Download
              onClick={() => downloadfile(file2)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setMouseEnter2(true)}
              onMouseLeave={() => setMouseEnter2(false)}
              color={mouseEnter2 ? Colors.primaryBrand : undefined}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Documentation;
