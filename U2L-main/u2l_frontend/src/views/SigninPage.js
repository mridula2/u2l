import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { hpe } from "grommet-theme-hpe";
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
  TextInput,
  Image,
  Notification,
} from "grommet";
import { Close, FormNext, CircleAlert, Article, Hpe } from "grommet-icons";
import { emailValidation } from "../components/UI/FormValidation";
// import Dashboard from "../views/DashboardView";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as SigninIMG } from "../Images/SignInIMG.svg";
import SigninIMG from "../Images/SigninImg.png";
import AuthenticationService from "../config/AuthenticationService";
import { Buffer } from "buffer";

const ResetPassword = ({ closeLayer }) => {
  const [formValues, setFormValues] = React.useState({ email: "" });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your password reset logic here
    // Display success status
    closeLayer();
  };

  return (
    <>
      <Box
        direction="row"
        justify="end"
        // pad={{ horizontal: "small", top: "small" }}
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
        <Text size="xxlarge" weight="bold">
          Reset Password
        </Text>
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
              htmlFor="email"
              name="email"
              // validate={emailValidation}
            >
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="your.email@company.com"
              />
            </FormField>
            <Button label="Send Password Reset" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </>
  );
};

const SigninPage = () => {
  const [formValues, setFormValues] = React.useState({
    name: "",
    password: "",
  });
  const size = useContext(ResponsiveContext);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [credentialError, setCredentialError] = React.useState(false);
  const [checked, setChecked] = useState(false);

  const [notificationVisible, setNotificationVisible] = React.useState();
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [status, setStatus] = React.useState("normal");

  const onNotificationOpen = () => {
    setNotificationVisible(true);
  };
  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  let navigate = useNavigate();

  const onClose = () => {
    setShowForgotPassword(false);
  };

  const onForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const onSignIn = (event) => {
    event.preventDefault();
    console.log(formValues);
    if (formValues.name.length === 0) {
      setNotificationMessage("Username is required");
      setStatus("warning");
      setNotificationVisible(true);
    } else if (formValues.password.length === 0) {
      setNotificationMessage("Password is required");
      setStatus("warning");
      setNotificationVisible(true);
    } else {
      // setFormValues({
      //   name: formValues.name,
      //   // password:   btoa(formValues.password),
      //   password:  Buffer.from(formValues.password).toString('base64'),
      // })
      AuthenticationService.storeUserDetails(formValues.name);
      console.log({
        name: `${formValues.name}`,
        password: `${Buffer.from(formValues.password).toString("base64")}`,
      });
      // axios.post('url',{name:formValues.name, password:formValues.password},)
      AuthenticationService.signIn({
        name: `${formValues.name}`,
        password: `${Buffer.from(formValues.password).toString("base64")}`,
      })
        .then((response) => {
          // response.data
          console.log(response);
          if (response.data.message === "authentication success") {
            AuthenticationService.storeUserDetails(formValues.name);
            navigate("/dashboard");
          } else {
            setCredentialError(true);
            setNotificationMessage("Username or Password is wrong");
            setStatus("critical");
            setNotificationVisible(true);
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 401) {
            setCredentialError(true);
            setNotificationMessage("Username or Password is wrong");
            setStatus("critical");
            setNotificationVisible(true);
          } else {
            setNotificationMessage("Something went wrong");
            setStatus("critical");
            setNotificationVisible(true);
          }
        });
    }
  };

  const image = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const box = {
    position: "absolute",
    left: "6%",
    top: "30%",
  };

  const para = {
    fontFamily: "MetricHPE",
    letterSpacing: "0px",
    color: "#FEFEFE",
    position: "absolute",
    left: "20%",
    top: "30%",
    transform: "translate(-50%,-50%)",
  };

  return (
    // <Grommet theme={hpe} full>
    // <ResponsiveContext.Consumer>
    <Box direction="row" marginleft="0" width="100%" height="100%">
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
      {/* flex="shrink" */}
      <Box width="45.3%" margin="0%">
        <Image src={SigninIMG} alt="HPE" style={image}></Image>
        {/* <SigninIMG /> */}
        {/* <img src="src\Images\Group244.png" alt="HPE" /> */}
        {/* style={image} for img attribute */}
        <Box style={box} width="30%">
          <Hpe size="large" color="plain" />
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
              margin: "5% 0",
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

      <Box alignContent="center" margin="auto auto">
        <Header
          margintop="100px"
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: "xxsmall" }}
        >
          
          <Heading level={4} margin="none">
            Sign In
          </Heading>
          {/* <Text>to Hewlett Packard Enterprise</Text> */}
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: "xxsmall" }}
          width="400px"
        >
          <Form
            validate="blur"
            value={formValues}
            onChange={setFormValues}
            messages={{
              required: "This is a required field.",
            }}
            onSubmit={({ value, touched }) => onSignIn({ value, touched })}
          >
            <FormField
              label="Username"
              name="name"
              htmlFor="name-sign-in"
              // validate={emailValidation}
              required={{ indicator: false }}
            >
              <TextInput
                id="name-sign-in"
                name="name"
                placeholder="Name"
                type="name"
              />
            </FormField>
            <FormField
              label="Password"
              htmlFor="password-sign-in"
              name="password"
              required={{ indicator: false }}
            >
              <TextInput
                id="password-sign-in"
                name="password"
                placeholder="Password"
                type="password"
              />
            </FormField>
            <FormField htmlFor="remember-me" name="remember-me">
              <CheckBox
                id="remember-me"
                name="remember-me"
                label="Remember me"
                checked={checked}
                onChange={event => setChecked(event.target.checked)}
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
              justify="center"
              align={!["xsmall", "small"].includes(size) ? "start" : undefined}
              margin={{ top: "medium", bottom: "small", left: "285px" }}
            >
              <Button
                width="180px"
                height="47px"
                label="Sign In"
                icon={<FormNext />}
                reverse
                primary
                type="submit"
                // href="/dashboard"
                // onClick={() => setShowModal(true)}
                onClick={(e) => onSignIn(e)}
              />
            </Box>
          </Form>
          <Box
            align="start"
            margin={{ top: "medium", bottom: "small", left: "275px" }}
            width="127px"
            height="20px"
          >
            <Anchor label="Forgot password?" onClick={onForgotPassword} />
            {showForgotPassword && (
              <Layer modal onClickOutside={onClose} onEsc={onClose}>
                <ResetPassword
                  closeLayer={onClose}
                  updateForm={setFormValues}
                />
              </Layer>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
    // </ResponsiveContext.Consumer>
    // </Grommet>
  );
};

ResetPassword.propTypes = {
  closeLayer: PropTypes.func,
  email: PropTypes.string,
};

export default SigninPage;
