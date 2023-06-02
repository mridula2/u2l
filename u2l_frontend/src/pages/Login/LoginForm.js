import { Close, FormNext } from 'grommet-icons';
import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
  Text,
  TextInput,
  Notification,
} from 'grommet';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from '../../utils/FormValidation';
import AuthenticationService from '../../api/AuthenticationService';
import CommonUtils from '../../utils/CommonUtils';
import AuthenticationUtils from '../../utils/AuthenticationUtils';

const ResetPassword = ({ closeLayer, email }) => {
  const [formValues, setFormValues] = React.useState({ resetEmail: email });
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [status, setStatus] = React.useState('normal');
  const onSubmit = ({ value }) => {
    //reset logic here
    console.log(value.resetEmail);
    // AuthenticationService.forgotPassword(value.resetEmail)
    //   .then((response) => {
    //     setNotificationMessage(`Email has been sent to ${value.resetEmail}`);
    //     setStatus("success");
    //     setNotificationVisible(true);
    //   })
    //   .catch((error) => {
    //     setNotificationMessage("Something went wrong");
    //     setStatus("critical");
    //     setNotificationVisible(true);
    //   });

    closeLayer();
  };
  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  return (
    <Box>
      <Box align='center' gap='small'>
        {notificationVisible && (
          <Notification
            toast
            time={4000}
            status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>
      <Box
        direction='row'
        justify='end'
        pad={{ horizontal: 'small', top: 'small' }}
      >
        <Button
          a11yTitle='Close reset password form'
          icon={<Close />}
          onClick={closeLayer}
        />
      </Box>
      <Box
        gap='medium'
        margin={{ horizontal: 'xlarge', bottom: 'xlarge', top: 'large' }}
        width='medium'
      >
        <Heading level={2} margin='none'>
          Reset Password
        </Heading>
        <Form
          validate='blur'
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method='post'
        >
          <Box gap='medium'>
            <Text>
              An email to reset your password will be sent to the following
              address:
            </Text>
            <FormField
              label='Email'
              htmlFor='resetEmail'
              name='resetEmail'
              validate={emailValidation}
            >
              <TextInput
                id='resetEmail'
                name='resetEmail'
                type='email'
                placeholder='your.email@company.com'
              />
            </FormField>
            <Button label='Send password reset' primary type='submit' />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

const LoginForm = () => {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const size = useContext(ResponsiveContext);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [status, setStatus] = React.useState('normal');
  const navigate = useNavigate();

  const onClose = () => {
    setShowForgotPassword(false);
  };

  const onForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  const onSubmit = ({ value }) => {
    console.log(window.location.pathname)
    AuthenticationService.signIn({
      email: `${value.email}`,
      password: `${CommonUtils.convertStringToBase64(value.password)}`,
    })
      .then((response) => {
        // console.log(response);
        if (response.data.message === 'authentication success') {
          AuthenticationUtils.storeUserDetails({
            jwt: 'jwt',
            // name:response.data.user_name,
            email: value.email,
            checked,
          });
          console.log(AuthenticationUtils.getEmail());
          navigate('/dashboard');
        } else {
          setNotificationMessage('Email or Password is wrong');
          setStatus('critical');
          setNotificationVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            setNotificationMessage('Email or Password is wrong');
            setStatus('critical');
            setNotificationVisible(true);
          } else {
            setNotificationMessage('Something went wrong');
            setStatus('critical');
            setNotificationVisible(true);
          }
        } else {
          setNotificationMessage('Please check your internet connection!');
          setStatus('critical');
          setNotificationVisible(true);
        }
      });
  };
  return (
    <Box margin={{ top: '3%', left: '5%' }}>
      <Box align='center' gap='small'>
        {notificationVisible && (
          <Notification
            toast
            time={4000}
            status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>
      <Header
        direction='column'
        align='start'
        gap='xxsmall'
        pad={{ horizontal: 'xxsmall' }}
      >
        <Heading level={1} margin='none' style={{ fontWeight: 'bold' }}>
          Sign In
        </Heading>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
        width='90%'
        margin={{ top: '3%' }}
      >
        <Form
          validate='blur'
          value={formValues}
          onChange={setFormValues}
          messages={{
            required: 'This is a required field.',
          }}
          onSubmit={({ value }) => onSubmit({ value })}
        >
          {/* <label htmlFor='email-sign-in'>Email</label> */}
          <FormField
            name='email'
            label='Email'
            htmlFor='email-sign-in'
            validate={emailValidation}
            required={{ indicator: false }}
          >
            <TextInput
              id='email-sign-in'
              name='email'
              placeholder='email@company.com'
              type='email'
            />
          </FormField>
          {/* <label htmlFor='password-sign-in'>Password</label> */}
          <FormField
            htmlFor='password-sign-in'
            name='password'
            label='Password'
            required={{ indicator: false }}
          >
            <TextInput
              id='password-sign-in'
              name='password'
              placeholder='Enter your password'
              type='password'
            />
          </FormField>
          <FormField htmlFor='remember-me'>
            <CheckBox
              id='remember-me'
              name='rememberMe'
              label='Remember me'
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </FormField>
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'small', bottom: 'small' }}
          >
            <Button
              label='Sign In'
              icon={<FormNext />}
              reverse
              primary
              type='submit'
            />
          </Box>
        </Form>
        <Box align='start'>
          <a onClick={onForgotPassword}>Forgot password?</a>
          <Text>Don't have an account? <a href='/signup'>Sign-up</a></Text>
          {showForgotPassword && (
            <Layer modal onClickOutside={onClose} onEsc={onClose}>
              <ResetPassword
                closeLayer={onClose}
                email={formValues.email}
                updateForm={setFormValues}
              />
            </Layer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
