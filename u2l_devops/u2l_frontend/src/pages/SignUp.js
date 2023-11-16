import React, { useContext } from 'react';
import {
  Box,
  Button,
  List,
  Form,
  FormField,
  Header,
  Heading,
  MaskedInput,
  Text,
  TextInput,
  ResponsiveContext,
  Select,
} from 'grommet';
import { FormCheckmark } from 'grommet-icons';
import {
  emailMask,
  emailValidation,
  passwordRequirements,
  passwordRulesStrong,
} from '../utils/FormValidation';
import { useNavigate } from 'react-router-dom';
import CommonUtils from '../utils/CommonUtils';
import AuthenticationService from '../api/AuthenticationService';

const SignUp = () => {
  const [formValues, setFormValues] = React.useState({
    first_name: '',
    last_name: '',
    user_role: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [passwordRules, setPasswordRules] = React.useState(passwordRulesStrong);
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();
  const userRoles = ['Delivery', 'Pursuit', 'Customer'];

  const onChange = (values) => {
    setFormValues(values);
    const adjustedPasswordRules = passwordRules.map((rule) => {
      const adjustedRule = { ...rule };
      const valid = adjustedRule.regexp.test(values.password);
      adjustedRule.valid = valid;
      return adjustedRule;
    });
    setPasswordRules(adjustedPasswordRules);
  };

  const confirmPassword = () => {
    const doesMatch = formValues.password === formValues.confirm_password;
    return doesMatch
      ? undefined
      : { message: 'Passwords do not match', status: 'error' };
  };

  const onSubmit = ({ value }) => {
    const data = { ...value };
    data.password = CommonUtils.convertStringToBase64(value.password);
    delete data['confirm_password'];
    AuthenticationService.signUp(data)
      .then(() => navigate('/'))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box gap='small' width='medium' alignContent='center' margin='3vh auto 0px'>
      <Header
        direction='column'
        align='start'
        gap='xxsmall'
        pad={{ horizontal: 'xxsmall' }}
      >
        <Heading level={2} margin='none'>
          Sign Up
        </Heading>
        <Text>for a HPE Code Assessment suite</Text>
      </Header>
      <Box pad={{ horizontal: 'xxsmall' }}>
        <Form
          validate='blur'
          value={formValues}
          messages={{
            required: 'This is a required field.',
          }}
          onChange={(nextValue) => onChange(nextValue)}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method='post'
        >
          <FormField
            label='First name'
            htmlFor='first_name'
            name='first_name'
            required={{ indicator: false }}
          >
            <TextInput
              id='first_name'
              name='first_name'
              placeholder='Enter first name'
            />
          </FormField>
          <FormField
            label='Last name'
            htmlFor='last_name'
            name='last_name'
            required={{ indicator: false }}
          >
            <TextInput
              id='last_name'
              name='last_name'
              placeholder='Enter last name'
            />
          </FormField>
          <FormField
            label='Email'
            htmlFor='email'
            name='email'
            type='email'
            validate={emailValidation}
            required={{ indicator: false }}
          >
            <MaskedInput
              id='email'
              name='email'
              mask={emailMask}
              type='email'
            />
          </FormField>
          <FormField
            htmlFor='user_role'
            name='user_role'
            label='User Role'
            required={{ indicator: false }}
          >
            <Select
              id='user_role'
              name='user_role'
              options={userRoles}
              placeholder='Select role'
            />
          </FormField>
          
          <FormField
            required={{ indicator: false }}
            label='Password'
            validate={passwordRequirements}
            htmlFor='password'
            name='password'
            info={
              <List data={passwordRules} border={{ color: 'none' }} pad='none'>
                {(rule) => {
                  if (
                    formValues.password === undefined ||
                    formValues.password.length === 0
                  ) {
                    return (
                      <Box direction='row' gap='xsmall'>
                        <Text size='xsmall'>{rule.message}</Text>
                      </Box>
                    );
                  }
                  return (
                    <Box direction='row' gap='xsmall'>
                      {formValues.password && rule.valid && (
                        <Box alignSelf='center'>
                          <FormCheckmark size='small' />
                        </Box>
                      )}
                      <Text size='xsmall'>{rule.message}</Text>
                    </Box>
                  );
                }}
              </List>
            }
          >
            <TextInput
              id='password'
              name='password'
              placeholder='User password'
              type='password'
            />
          </FormField>
          <FormField
            htmlFor='confirm_password'
            name='confirm_password'
            label='Confirm password'
            required={{ indicator: false }}
            validate={confirmPassword}
          >
            <TextInput
              id='confirm_password'
              name='confirm_password'
              placeholder='Re-enter password'
              type='password'
            />
          </FormField>
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label='Sign Up' primary type='submit' />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default SignUp;
