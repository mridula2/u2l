import LoginPageFooter from './LoginPageFooter';
import { Box } from 'grommet';
import LoginPageBody from './LoginPageBody';

const LoginPage = () => {
  return (
    <Box
      data-testid='LoginPage'
      background='background'
      direction='column'
    >
      <Box align='center' justify='center' flex>
        <LoginPageBody data-testid='login-body' />
      </Box>
      <LoginPageFooter data-testid='login-footer' />
    </Box>
  );
};

export default LoginPage;
