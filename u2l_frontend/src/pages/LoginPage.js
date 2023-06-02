import { Hpe, Close, FormNext, CircleAlert } from "grommet-icons";
import React, { useContext, useState } from "react";
import {
  Anchor,
  Box,
  Image,
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
} from "grommet";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../utils/FormValidation";
import PropTypes from "prop-types";
import Image1 from "../assets/Images/SigninImg.png";
import AuthenticationService from "../api/AuthenticationService";
import { Buffer } from "buffer";

const ResetPassword = ({ closeLayer, email }) => {
  const [formValues, setFormValues] = React.useState({ resetEmail: email });
  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [status, setStatus] = React.useState("normal");
  const onSubmit = ({ value, touched }) => {
    //reset logic here
    console.log(value.resetEmail);
    AuthenticationService.forgotPassword(value.resetEmail)
      .then((response) => {
        setNotificationMessage(`Email has been sent to ${value.resetEmail}`);
        setStatus("success");
        setNotificationVisible(true);
      })
      .catch((error) => {
        setNotificationMessage("Something went wrong");
        setStatus("critical");
        setNotificationVisible(true);
      });

    closeLayer();
  };

  return (
    <>
      <Box
        direction="row"
        justify="end"
        pad={{ horizontal: "small", top: "small" }}
      >
        <Button
          a11yTitle="Close reset password form"
          icon={<Close />}
          onClick={closeLayer}
        />
      </Box>
      <Box
        gap="medium"
        margin={{ horizontal: "xlarge", bottom: "xlarge", top: "large" }}
        width="medium"
      >
        <Heading level={2} margin="none">
          Reset Password
        </Heading>
        <Form
          validate="blur"
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <Box gap="medium">
            <Text>
              An email to reset your password will be sent to the following
              address:
            </Text>
            <FormField
              label="Email"
              htmlFor="resetEmail"
              name="resetEmail"
              validate={emailValidation}
            >
              <TextInput
                id="resetEmail"
                name="resetEmail"
                type="email"
                placeholder="your.email@company.com"
              />
            </FormField>
            <Button label="Send password reset" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </>
  );
};

const LoginPage = () => {
  const box = {
    position: 'absolute',
    left: '16%',
    top: '30%'
  };
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const size = useContext(ResponsiveContext);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [credentialError, setCredentialError] = React.useState(false);
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
    // AuthenticationService.storeUserDetails({
    //   jwt: "jwt",
    //   email: value.email,
    //   checked: checked,
    // });
    console.log(AuthenticationService.isUserLoggedIn())
    AuthenticationService.signIn({
      email: `${value.email}`,
      password: `${Buffer.from(value.password).toString('base64')}`
    })
      .then(response => {
        // console.log(response);
        if (response.data.message === 'authentication success') {
          AuthenticationService.storeUserDetails({
            jwt: "jwt",
            // name:response.data.user_name,
            email: value.email,
            checked: checked,
          });
          console.log(AuthenticationService.isUserLoggedIn());
          navigate("/dashboard");
        } else {
          setNotificationMessage("Email or Password is wrong");
          setStatus("critical");
          setNotificationVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            setCredentialError(true);
            setNotificationMessage("Email or Password is wrong");
            setStatus("critical");
            setNotificationVisible(true);
          } else {
            setNotificationMessage("Something went wrong");
            setStatus("critical");
            setNotificationVisible(true);
          }
        } else {
          setNotificationMessage("Please check your internet connection!");
          setStatus("critical");
          setNotificationVisible(true);
        }
      });
  };
  return (
    <Box direction="row-responsive">
      <Box align="center" gap="small">
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
        round="small"
        width="50vw"
        height="100vh"
        style={{ position: "relative" }}
      >
        <Image src={Image1} width="100%" height="100%" />
        <Box style={box} width="100%">
          <Hpe size="xxlarge" color="plain" />
          <p
            style={{
              color: "#FEFEFE",
              fontSize: "40px",
              fontFamily: "MetricHPE",
              fontWeight: "semibold",
              margin: "0%",
            }}
          >
            Hewlett Packard
          </p>
          <p
            style={{
              color: "#FEFEFE",
              fontSize: "40px",
              fontFamily: "MetricHPE",
              fontWeight: "semibold",
              margin: "3% 0",
            }}
          >
            Enterprise
          </p>
          <p
            style={{
              color: "#FEFEFE",
              fontSize: "16px",
              fontFamily: "MetricHPE",
              fontWeight: "semibold",
              margin: "0%",
            }}
          >
            HPE Code Assessment Suite
          </p>
        </Box>
      </Box>
      <Box
        justify="center"
        width="50vw"
        height="100vh"
        margin={{ left: "10vw" }}
      >
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: "xxsmall" }}
        >
          <Heading level={1} margin="none" style={{ fontWeight: "bold" }}>
            Sign In
          </Heading>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: "xxsmall" }}
          width="400px"
          margin={{ top: "3%" }}
        >
          <Form
            validate="blur"
            value={formValues}
            onChange={setFormValues}
            messages={{
              required: "This is a required field.",
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <label htmlFor="email-sign-in">Email</label>
            <FormField
              name="email"
              htmlFor="email-sign-in"
              validate={emailValidation}
              required={{ indicator: false }}
            >
              <TextInput
                id="email-sign-in"
                name="email"
                placeholder="email@company.com"
                type="email"
              />
            </FormField>
            <label htmlFor="password-sign-in">Password</label>
            <FormField
              htmlFor="password-sign-in"
              name="password"
              required={{ indicator: false }}
            >
              <TextInput
                id="password-sign-in"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </FormField>
            <FormField htmlFor="remember-me">
              <CheckBox
                id="remember-me"
                name="rememberMe"
                label="Remember me"
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              />
            </FormField>
            {credentialError && (
              <Box
                animation="fadeIn"
                align="center"
                background="validation-critical"
                direction="row"
                gap="xsmall"
                margin={{ top: "medium", bottom: "medium" }}
                pad="small"
                round="4px"
              >
                <CircleAlert size="small" />
                <Text size="xsmall">Invalid credentials.</Text>
              </Box>
            )}
            <Box
              align={!["xsmall", "small"].includes(size) ? "start" : undefined}
              margin={{ top: "medium", bottom: "small" }}
            >
              <Button
                label="Sign In"
                icon={<FormNext />}
                reverse
                primary
                type="submit"
              />
            </Box>
          </Form>
          <Box align="start" margin={{ top: "medium", bottom: "small" }}>
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
    </Box>
  );
};

ResetPassword.propTypes = {
  closeLayer: PropTypes.func,
  email: PropTypes.string,
};

export default LoginPage;
