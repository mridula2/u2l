import HomePageBG from '../../assets/Images/HomePageBG.png';
import { Box, Heading, Card, ResponsiveContext } from 'grommet';
import LinksPage from './LinksPage';
import LoginForm from './LoginForm';
import { useContext } from 'react';

const LoginPageBody = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box fill responsive={true} data-testid='overview'>
      <Box
        style={styles.divStyle}
        fill
        // direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        direction='row'
        align='center'
      >
        {/* on this signin component will come */}
        <Box margin={{ left: 'large' }}>
          <Heading
            font='MetricHPEXS'
            style={{ height: '70px', color: 'white' }}
          >
            HPE Code Assessment Suite
          </Heading>
        </Box>

        <Box margin={{ right: '10vw' }}>
          <Card style={styles.LoginFormCard} margin={{ left: '20vw' }}>
            <LoginForm />
          </Card>
        </Box>
      </Box>
      <Box margin='auto' fill direction='row'>
        <LinksPage />
      </Box>
    </Box>
  );
};

const styles = {
  divStyle: {
    backgroundImage: `url(${HomePageBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    height: '70vh',
    width: '100%',
  },
  LoginFormCard: {
    height: '65vh',
    width: '70%',
  },
};

export default LoginPageBody;
