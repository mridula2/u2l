import React, { useContext } from 'react';
import {
  Anchor,
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
  TextArea,
  TextInput,
  Notification,
} from 'grommet';
import LinksPage from './Login/LinksPage';
import { Link } from 'react-router-dom';
import LoginPageFooter from './Login/LoginPageFooter';
import { emailValidation } from '../utils/FormValidation';
import ProjectService from '../api/ProjectService';
import Colors from '../config/colors';

const Contact = () => {
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [status, setStatus] = React.useState('normal');

  const [formValues, setFormValues] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    message: '',
  });
  const mailtoHref =
    'mailto:mridula.krishnamurthy@hpe.com?subject=U2L Contact us';
  // const mailtoHref =
  //   'https://outlook.live.com/mail/0/deeplink/compose?to=mridula.krishnamurthy@hpe.com';
  const size = useContext(ResponsiveContext);

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  const onSubmit = ({ value }) => {
    const data = { ...value };
    ProjectService.saveContact(data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setNotificationMessage(
            'Message sent successfully. We will contact you'
          );
          setNotificationVisible(true);
        } else {
          setNotificationMessage('Message not sent! Please try again!');
          setNotificationVisible(true);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box data-testid='ContactPage'>
      <Box align='center' gap='small'>
        {notificationVisible && (
          <Notification
            toast
            time={8000}
            status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>
      <Box
        // height='600px'
        width='large'
        alignSelf='center'
        direction='row'
        margin={{ bottom: 'small', left: '15%', top: '5vh' }}
      >
        <Box>
          <Text
            weight='bold'
            textAlign='start'
            pad='medium'
            margin={{ bottom: 'large' }}
            size='large'
          >
            Contact us
          </Text>
          <Box gap='small' margin='small'>
            <Box>
              {' '}
              <Text weight='bold'> Mail us </Text>
            </Box>
            <Box>
              <Link
                to={mailtoHref}
                style={{
                  color: Colors.primaryBrand,
                  textDecoration: 'underline',
                }}
              >
                mridula.krishnamurthy@hpe.com
              </Link>

              {/* <Link to="/divya@hpe.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                divya@hpe.com
              </Link>

              <Link to="/divya@hpe.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                Yuva@hpe.com
              </Link> */}
            </Box>
          </Box>
        </Box>

        <Box margin={{ left: '10%' }}>
          <Text weight='bold' textAlign='start' size='large'>
            Write to us
          </Text>
          <Text>We will contact you</Text>

          <Box gap='medium' width='medium' margin={{ top: 'medium' }}>
            <Box
              // Padding used to prevent focus from being cutoff
              pad={{ horizontal: 'xxsmall' }}
            >
              <Form
                validate='blur'
                value={formValues}
                onChange={setFormValues}
                messages={{
                  required: 'This is a required field.',
                }}
                onSubmit={({ value }) => onSubmit({ value })}
                // onSubmit={({ value, touched }) => onSubmit({ value, touched })}
              >
                <FormField
                  label='First Name'
                  name='first_name'
                  htmlFor='first_name'
                  required={{ indicator: true }}
                >
                  <TextInput
                    id='first_name'
                    name='first_name'
                    placeholder='Enter first name'
                    type='text'
                  />
                </FormField>

                <FormField
                  label='Last Name'
                  name='last_name'
                  htmlFor='last_name'
                  required={{ indicator: true }}
                >
                  <TextInput
                    id='last_name'
                    name='last_name'
                    placeholder='Enter last name'
                    type='text'
                  />
                </FormField>

                <FormField
                  label='Email'
                  name='email'
                  htmlFor='email-sign-in'
                  validate={emailValidation}
                  required={{ indicator: true }}
                >
                  <TextInput
                    id='email-sign-in'
                    name='email'
                    placeholder='Enter email'
                    type='email'
                  />
                </FormField>

                <FormField
                  label='Contact Number'
                  htmlFor='contact_number'
                  name='contact_number'
                >
                  <TextInput
                    id='contact_number'
                    name='contact_number'
                    placeholder='(XXX) XXXXX XXXXX'
                    type='number'
                  />
                </FormField>

                <FormField
                  label='Message'
                  htmlFor='message'
                  name='message'
                  required={{ indicator: true }}
                >
                  <Box height='xsmall'>
                    <TextArea
                      id='message'
                      name='message'
                      placeholder='Describe'
                      type='text'
                      resize={false}
                      fill='vertical'
                    />
                  </Box>
                </FormField>

                {/* {credentialError && (
                  <Box
                    animation="fadeIn"
                    align="center"
                    background="validation-critical"
                    direction="row"
                    gap="xsmall"
                    margin={{ top: 'medium', bottom: 'medium' }}
                    pad="small"
                    round="4px"
                  >
                    <CircleAlert size="small" />
                    <Text size="xsmall">Invalid credentials.</Text>
                  </Box>
                )} */}

                <Box
                  align={
                    !['xsmall', 'small'].includes(size) ? 'end' : undefined
                  }
                  margin={{ top: 'medium', bottom: 'small' }}
                >
                  <Button label='Send' reverse primary type='submit' />
                </Box>
              </Form>
              {/* <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
                <Anchor label="Forgot password?" onClick={onForgotPassword} />
                {showForgotPassword && (
                  <Layer modal onClickOutside={onClose} onEsc={onClose}>
                    <ResetPassword
                      closeLayer={onClose}
                      email={formValues.email}
                      updateForm={setFormValues}
                    />
                  </Layer>
                )}
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <LinksPage />
      </Box>
      <Box>
        <LoginPageFooter />
      </Box>
    </Box>
  );
};

export default Contact;
