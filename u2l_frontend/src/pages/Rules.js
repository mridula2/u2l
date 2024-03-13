import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  Header,
  Layer,
  Button,
  Heading,
  Form,
  Text,
  FormField,
  TextInput,
  Select,
  Notification,
  RangeInput,
  Spinner,
} from 'grommet';
import { Compliance, Close, Checkmark, Java } from 'grommet-icons';

import SideBar from '../components/common/SideBar';
import Colors from '../config/colors';
import RulesService from '../api/RulesService';

const AddRulesForm = ({
  closeLayer,
  setNotificationVisible,
  setNotificationMessage,
  setStatus,
}) => {
  const language = [
    'Java',
    // 'Shell',
    // 'C',
    // 'C++',
    // 'Pro*C',
    // 'C/Pro*C',
    // 'C++/Pro*C',
  ];
  const [formValues, setFormValues] = useState({
    package_language: '',
    package_url: '',
    package_name: '',
    package_version: '',
  });
  const [packageLang, setPackageLang] = useState('Java');
  const [isServerReachable, setIsServerReachable] = useState(false);

  const handleshowhide = (event) => {
    const getLang = event.target.value;
    setPackageLang(getLang);
  };

  const checkServerStatus = () => {
    RulesService.checkURL().then((response) => {
      if (response.status === 200) {
        setIsServerReachable(true);
      } else {
        setIsServerReachable(false);
      }
    });
  };
  const onSubmit = () => {
    console.log(formValues);

    // checkServerStatus();
    // // console.log(check);
    // setNotificationVisible(true);
    // setNotificationMessage(`Checking server status`);
    // setStatus('info');
    // if (isServerReachable) {
    //   // API call
    //   setNotificationVisible(true);
    //   setNotificationMessage(
    //     `Adding rules for package ${formValues.packageName}`
    //   );
    //   setStatus('info');
    //   RulesService.addRules(formValues)
    //     .then((response) => {
    //       console.log(response);
    //       setNotificationVisible(true);
    //       setNotificationMessage(
    //         `Rules for package ${formValues.packageName} added successfully`
    //       );
    //       setStatus('normal');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setNotificationVisible(true);
    //       setNotificationMessage(
    //         `Failed to add rules for package ${formValues.packageName}`
    //       );
    //       setStatus('critical');
    //     });
    // } else {
    //   setNotificationVisible(true);
    //   setNotificationMessage(`Website is not reachable!`);
    //   setStatus('critical');
    // }
    setNotificationMessage(
      `Adding rules for package ${formValues.package_name}`
    );
    setNotificationVisible(true);
    setStatus('info');
    RulesService.addRules(formValues)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setNotificationVisible(true);
          setNotificationMessage(
            `Rules for package ${formValues.package_name} added successfully`
          );
          setStatus('normal');
        }
      })
      .catch((error) => {
        console.log(error);
        setNotificationVisible(true);
        setNotificationMessage(
          `Failed to add rules for package ${formValues.package_name}`
        );
        setStatus('critical');
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);

      });
    closeLayer();
  };
  return (
    <Box>
      <Box
        direction='row'
        justify='end'
        pad={{ horizontal: 'small', top: 'small' }}
      >
        <Button a11yTitle='Close form' icon={<Close />} onClick={closeLayer} />
      </Box>
      <Box
        gap='medium'
        margin={{ horizontal: 'large', bottom: 'large', top: 'small' }}
        width='medium'
      >
        <Heading level={2} margin='none'>
          Add SDK Rules
        </Heading>
        <Form
          validate='submit'
          value={formValues}
          messages={{
            required: 'This is a required field.',
          }}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method='post'
        >
          <Box gap='small'>
            {/* <Text>
            An email to reset your password will be sent to the following
            address:
          </Text> */}
            <FormField
              label='Language'
              htmlFor='package_language'
              name='package_language'
              required={true}
            >
              <Select
                placeholder='Languages'
                id='package_language'
                name='package_language'
                options={language}
                onChange={(e) => handleshowhide(e)}
              />
            </FormField>
            {packageLang !== 'Java' && (
              <>
                <Box>
                  <Box direction='row'>
                    <Box fill>
                      <FormField
                        label='URL'
                        htmlFor='package_url'
                        name='package_url'
                        // validate={emailValidation}
                        required={true}
                        // onBlur={checkServerStatus}
                        margin={{ right: 'small' }}
                      >
                        <TextInput
                          id='package_url'
                          name='package_url'
                          type='package_url'
                          placeholder='https://www.langdocs.com'
                        />
                      </FormField>
                    </Box>
                    {/* <Box>
                      {!isServerReachable && (
                        <Close style={{ marginTop: '37px' }} color='red' />
                      )}
                      {isServerReachable && (
                        <Checkmark
                          color='green'
                          style={{ marginTop: '37px' }}
                        />
                      )}
                    </Box> */}
                  </Box>
                  {/* {!isServerReachable && (
                    <Text color={'red'}>Please Enter valid url</Text>
                  )} */}
                </Box>
                <FormField
                  label='Package Name'
                  htmlFor='package_name'
                  name='package_name'
                  // validate={emailValidation}
                  required={true}
                >
                  <TextInput
                    id='package_name'
                    name='package_name'
                    type='text'
                    placeholder='Enter Package Name'
                  />
                </FormField>
              </>
            )}
            <FormField
              label='Version'
              htmlFor='package_version'
              name='package_version'
              // validate={emailValidation}
              required={true}
            >
              <TextInput
                id='package_version'
                name='package_version'
                type='number'
                placeholder='Version to be added'
                min={6}
                max={19}
              />
            </FormField>
            <Button
              label='Add Rules'
              primary
              type='submit'
              margin={{ top: 'small' }}
            // disabled={!isServerReachable}
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

// const AddJavaLibrariesForm = ({
//   closeLayer,
//   setNotificationVisible,
//   setNotificationMessage,
//   setStatus,
//   javaLibrariesProp,
//   javaLibWithVersionsProp
// }) => {
//   const [formValues, setFormValues] = useState({
//     package_name: '',
//     package_version: '',
//     package_url: '',
//   });

//   const packages = [
//     'Angus Activation',
//     'ECJ',
//     'JavaHamcrest',
//     'Mchange commons',
//     'Micrometer Core',
//     'okhttp',
//     'zip4j',
//     'Apache Tomcat',
//     'Apache ANT',
//     'aspectjweaver',
//     'aspectjrt',
//     'Axis',
//     'Bouncycastle',
//     'cglib-nodep',
//     'Commons Beanutils',
//     'Commons Configuration',
//     'Commons Dbcp',
//     'Commons Digester',
//     'Commons Discovery',
//     'Commons Lang',
//     'Commons Collections',
//     'Commons Codec',
//     'Apache Commons',
//     'Commons Pool',
//     'Commons Logging',
//     'Diffutils',
//     'Geronimo',
//     'Groovy-lang',
//     'Hazelcast',
//     'HTTPcore',
//     'HTTPclient',
//     'Imap',
//     'IText',
//     'Jasper Reports',
//     'Jaxrpc',
//     'Jcifs',
//     'Jcommon',
//     'Jdom',
//     'Jfreechart',
//     'Jsch Documentation',
//     'Juddi Client',
//     'Apache OpenJPA',
//     'Mybatis',
//     'Mybatis Spring',
//     'Opencsv',
//     'POI',
//     'Quartz scheduler',
//     'slf4j',
//     'wsdl4j',
//     'XMLBeans',
//   ];
//   const [isServerReachable, setIsServerReachable] = useState();
//   const [options, setOptions] = useState(packages);
//   const [javaLibraries, setJavaLibraries] = useState(javaLibrariesProp);
//   const [javaLibWithVersions, setJavaLibWithVersions] = useState(javaLibWithVersionsProp);

//   const checkServerStatus = (url) => {
//     RulesService.checkURL(url)
//       .then((response) => {
//         if (response.status === 200) {
//           setIsServerReachable(true);
//         } else {
//           setIsServerReachable(false);
//         }
//         console.log(response);
//       })
//       .catch((error) => {
//         setNotificationMessage('error');
//         setNotificationVisible(true);
//         setStatus('critical');
//       });
//   };

//   // const onSubmit = () => {
//   //   // checkServerStatus(formValues.package_url);
//   //   console.log(formValues);
//   //   const checkURL =
//   //     formValues.package_url !== null && formValues.package_url !== '';
//   //   if (checkURL) {
//   //     checkServerStatus(formValues.package_url);
//   //   }
//   //   setNotificationVisible(true);
//   //   setNotificationMessage(`Checking server status`);
//   //   setStatus('info');
//   //   if ((checkURL && isServerReachable) || checkURL === false) {
//   //     // API call
//   //     setNotificationVisible(true);
//   //     setNotificationMessage(
//   //       `Adding Libraries for package ${formValues.package_name}`
//   //     );
//   //     setStatus('info');
//   //     RulesService.addJavaLibraries(formValues)
//   //       .then((response) => {
//   //         // console.log(response);
//   //         setNotificationVisible(true);
//   //         setNotificationMessage(`Libraries added successfully`);
//   //         setStatus('normal');
//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //         setNotificationVisible(true);
//   //         setNotificationMessage(`Failed to add libraries`);
//   //         setStatus('critical');
//   //       });
//   //   } else if (checkURL && !isServerReachable) {
//   //     setNotificationVisible(true);
//   //     setNotificationMessage(`Website is not reachable!`);
//   //     setStatus('critical');
//   //   }
//   //   closeLayer();
//   // };

//   console.log(javaLibrariesProp);
//   console.log(javaLibWithVersionsProp);
//   const onSubmit = () => {
//     // checkServerStatus(formValues.package_url);
//     console.log({ package_name: formValues.package_name.package_name, package_url: formValues.package_url, package_version: formValues.package_version });
//     console.log(formValues.package_name.package_name)
//     // API call
//     setNotificationVisible(true);
//     setNotificationMessage(
//       `Adding Libraries for package ${formValues.package_name}`
//     );
//     setStatus('info');
//     const data = { package_name: formValues.package_name.package_name, package_url: formValues.package_url, package_version: formValues.package_version };
//     RulesService.addJavaLibraries(data)
//       .then((response) => {
//         console.log(response);
//         setNotificationVisible(true);
//         setNotificationMessage(`Libraries added successfully`);
//         setStatus('normal');
//       })
//       .catch((err) => {
//         console.log(err);
//         setNotificationVisible(true);
//         setNotificationMessage(`Failed to add libraries`);
//         setStatus('critical');
//       });

//     closeLayer();
//   };
//   const setTextInput = () => {
//     let val = javaLibrariesProp.filter((obj) => {
//       return obj.package_name === formValues.package_name.package_name;
//     })
//     // console.log(val);
//     if (val.length === 0) {
//       return ''
//     }
//     return val[0].package_url;
//   }

//   const setSelectValue = () => {
//     let arr = javaLibWithVersionsProp.filter(lib => lib.package_name === formValues.package_name.package_name);
//     console.log(arr[0].package_version);
//     return arr[0].package_version;
//   }
//   const con = () => {
//     console.log(javaLibWithVersionsProp.some((lib) => {
//       console.log(lib.package_name);
//       console.log(formValues.package_name.package_name)
//       return lib.package_name === formValues.package_name.package_name
//     }))

//   }
//   console.log(con());
//   return (
//     <Box>
//       <Box
//         direction='row'
//         justify='end'
//         pad={{ horizontal: 'small', top: 'small' }}
//       >
//         <Button a11yTitle='Close form' icon={<Close />} onClick={closeLayer} />
//       </Box>
//       <Box
//         gap='medium'
//         margin={{ horizontal: 'large', bottom: 'large', top: 'small' }}
//         width='medium'
//         style={{ overflow: 'clip' }}
//       >
//         <Heading level={2} margin='none'>
//           Add Java Libraries
//         </Heading>
//         <Form
//           validate='submit'
//           // value={javaLibraries}
//           messages={{
//             required: 'This is a required field.',
//           }}
//           onChange={setFormValues}
//           onSubmit={({ value, touched }) => onSubmit({ value, touched })}
//           method='post'
//         >
//           <Box gap='small'>
//             {/* <Text>
//             An email to reset your password will be sent to the following
//             address:
//           </Text> */}
//             <FormField
//               label='Package Name'
//               htmlFor='package_name'
//               name='package_name'
//               required={true}
//             >
//               <Select
//                 placeholder='Package Name'
//                 id='package_name'
//                 name='package_name'
//                 options={javaLibraries}
//                 onClose={() => setOptions(javaLibraries)}
//                 onSearch={(text) => {
//                   const escapedText = text.replace(
//                     /[-\\^$*+?.()|[\]{}]/g,
//                     '\\$&'
//                   );
//                   const exp = new RegExp(escapedText, 'i');
//                   setOptions(packages.filter((o) => exp.test(o)));
//                 }}
//               />
//             </FormField>

//             <Box>
//               <Box direction='row'>
//                 {<Box fill>
//                   <FormField
//                     label='URL'
//                     htmlFor='package_url'
//                     name='package_url'
//                   // validate={emailValidation}
//                   // required={true}
//                   // onBlur={checkServerStatus}
//                   // margin={{ right: 'small' }}
//                   >
//                     <TextInput
//                       id='package_url'
//                       name='package_url'
//                       type='package_url'
//                       placeholder='https://www.langdocs.com'
//                       value={setTextInput()}
//                     />
//                   </FormField>
//                 </Box>}
//                 {/* <Box>
//                   {isServerReachable !== undefined &&
//                     isServerReachable !== null &&
//                     isServerReachable === false && (
//                       <Close style={{ marginTop: '37px' }} color='red' />
//                     )}
//                   {isServerReachable && (
//                     <Checkmark color='green' style={{ marginTop: '37px' }} />
//                   )}
//                 </Box> */}
//               </Box>
//               {/* {isServerReachable !== undefined &&
//                 isServerReachable !== null &&
//                 isServerReachable === false && (
//                   <Text color={'red'}>Please Enter valid url</Text>
//                 )} */}
//             </Box>

//             <FormField
//               label='Version'
//               htmlFor='package_version'
//               name='package_version'
//             // validate={emailValidation}
//             // required={true}
//             // value={()=>{
//             //   let val = javaLibraries.filter((obj)=>{
//             //     return obj.package_name == formValues.package_name;
//             //   })

//             //   return val.package_version;
//             // }}
//             >
//               {javaLibWithVersionsProp.some(lib => lib.package_name === formValues.package_name.package_name) ?
//                 (<Select
//                   placeholder='Package version'
//                   id='package_version'
//                   name='package_version'
//                   options={setSelectValue()}

//                 />) : (<TextInput
//                   id='package_version'
//                   name='package_version'
//                   type='text'
//                   placeholder='Version to be added'
//                 />)
//               }

//             </FormField>
//             <Button
//               label='Add Rules'
//               primary
//               type='submit'
//               margin={{ top: 'small' }}
//             // disabled={
//             //   isServerReachable === null || isServerReachable === false
//             // }
//             />
//           </Box>
//         </Form>
//       </Box>
//     </Box>
//   );
// };

const AddJavaLibrariesForm = ({
  closeLayer,
  setNotificationVisible,
  setNotificationMessage,
  setStatus,
  javaLibrariesProp,
  javaLibWithVersionsProp
}) => {
  const [formValues, setFormValues] = useState({
    package_name: '',
    package_version: '',
    package_url: '',
  });

  // const packages = [
  //   'Angus Activation',
  //   'ECJ',
  //   'JavaHamcrest',
  //   'Mchange commons',
  //   'Micrometer Core',
  //   'okhttp',
  //   'zip4j',
  //   'Apache Tomcat',
  //   'Apache ANT',
  //   'aspectjweaver',
  //   'aspectjrt',
  //   'Axis',
  //   'Bouncycastle',
  //   'cglib-nodep',
  //   'Commons Beanutils',
  //   'Commons Configuration',
  //   'Commons Dbcp',
  //   'Commons Digester',
  //   'Commons Discovery',
  //   'Commons Lang',
  //   'Commons Collections',
  //   'Commons Codec',
  //   'Apache Commons',
  //   'Commons Pool',
  //   'Commons Logging',
  //   'Diffutils',
  //   'Geronimo',
  //   'Groovy-lang',
  //   'Hazelcast',
  //   'HTTPcore',
  //   'HTTPclient',
  //   'Imap',
  //   'IText',
  //   'Jasper Reports',
  //   'Jaxrpc',
  //   'Jcifs',
  //   'Jcommon',
  //   'Jdom',
  //   'Jfreechart',
  //   'Jsch Documentation',
  //   'Juddi Client',
  //   'Apache OpenJPA',
  //   'Mybatis',
  //   'Mybatis Spring',
  //   'Opencsv',
  //   'POI',
  //   'Quartz scheduler',
  //   'slf4j',
  //   'wsdl4j',
  //   'XMLBeans',
  // ];
  const [isServerReachable, setIsServerReachable] = useState();
  // const [options, setOptions] = useState(packages);
  const [javaLibraries, setJavaLibraries] = useState(javaLibrariesProp);
  const [javaLibWithVersions, setJavaLibWithVersions] = useState(javaLibWithVersionsProp);

  const checkServerStatus = (url) => {
    RulesService.checkURL(url)
      .then((response) => {
        if (response.status === 200) {
          setIsServerReachable(true);
        } else {
          setIsServerReachable(false);
        }
        console.log(response);
      })
      .catch((error) => {
        setNotificationMessage('error');
        setNotificationVisible(true);
        setStatus('critical');
      });
  };

  // const onSubmit = () => {
  //   // checkServerStatus(formValues.package_url);
  //   console.log(formValues);
  //   const checkURL =
  //     formValues.package_url !== null && formValues.package_url !== '';
  //   if (checkURL) {
  //     checkServerStatus(formValues.package_url);
  //   }
  //   setNotificationVisible(true);
  //   setNotificationMessage(`Checking server status`);
  //   setStatus('info');
  //   if ((checkURL && isServerReachable) || checkURL === false) {
  //     // API call
  //     setNotificationVisible(true);
  //     setNotificationMessage(
  //       `Adding Libraries for package ${formValues.package_name}`
  //     );
  //     setStatus('info');
  //     RulesService.addJavaLibraries(formValues)
  //       .then((response) => {
  //         // console.log(response);
  //         setNotificationVisible(true);
  //         setNotificationMessage(`Libraries added successfully`);
  //         setStatus('normal');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setNotificationVisible(true);
  //         setNotificationMessage(`Failed to add libraries`);
  //         setStatus('critical');
  //       });
  //   } else if (checkURL && !isServerReachable) {
  //     setNotificationVisible(true);
  //     setNotificationMessage(`Website is not reachable!`);
  //     setStatus('critical');
  //   }
  //   closeLayer();
  // };

  console.log(javaLibrariesProp);
  console.log(javaLibWithVersionsProp);
  const onSubmit = () => {
    // checkServerStatus(formValues.package_url);
    console.log({ package_name: formValues.package_name.package_name, package_url: formValues.package_url, package_version: formValues.package_version });
    console.log(formValues.package_name.package_name)
    // API call
    setNotificationVisible(true);
    setNotificationMessage(
      `Adding Libraries for package ${formValues.package_name}`
    );
    setStatus('info');
    const data = { package_name: formValues.package_name.package_name, package_url: formValues.package_url, package_version: formValues.package_version };
    RulesService.addJavaLibraries(data)
      .then((response) => {
        console.log(response);
        setNotificationVisible(true);
        setNotificationMessage(`Libraries added successfully`);
        setStatus('normal');
      })
      .catch((err) => {
        console.log(err);
        setNotificationVisible(true);
        setNotificationMessage(`Failed to add libraries`);
        setStatus('critical');
      });

    closeLayer();
  };
  const setTextInput = () => {
    let val = javaLibrariesProp.filter((obj) => {
      return obj.package_name === formValues.package_name.package_name;
    })
    // console.log(val);
    if (val.length === 0) {
      return ''
    }
    return val[0].package_url;
  }

  const setSelectValue = () => {
    let arr = javaLibWithVersionsProp.filter(lib => lib.package_name === formValues.package_name.package_name);
    console.log(arr[0].package_version);
    return arr[0].package_version;
  }
  const con = () => {
    console.log(javaLibWithVersionsProp.some((lib) => {
      console.log(lib.package_name);
      console.log(formValues.package_name.package_name)
      return lib.package_name === formValues.package_name.package_name
    }))

  }
  console.log(con());
  return (
    <Box>
      <Box
        direction='row'
        justify='end'
        pad={{ horizontal: 'small', top: 'small' }}
      >
        <Button a11yTitle='Close form' icon={<Close />} onClick={closeLayer} />
      </Box>
      <Box
        gap='medium'
        margin={{ horizontal: 'large', bottom: 'large', top: 'small' }}
        width='medium'
        style={{ overflow: 'clip' }}
      >
        <Heading level={2} margin='none'>
          Add Java Libraries
        </Heading>
        <Form
          validate='submit'
          value={formValues}
          messages={{
            required: 'This is a required field.',
          }}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
        >
          <Box gap='small'>
            {/* <Text>
            An email to reset your password will be sent to the following
            address:
          </Text> */}
            <FormField
              label='Package Name'
              htmlFor='package_name'
              name='package_name'
              required={true}
            >
              <Select
                placeholder='Package Name'
                id='package_name'
                name='package_name'
                options={javaLibraries}
              // onClose={() => setOptions(javaLibraries)}
              // onSearch={(text) => {
              //   const escapedText = text.replace(
              //     /[-\\^$*+?.()|[\]{}]/g,
              //     '\\$&'
              //   );
              //   const exp = new RegExp(escapedText, 'i');
              //   setOptions(packages.filter((o) => exp.test(o)));
              // }}
              />
            </FormField>

            <Box>
              <Box direction='row'>
                {<Box fill>
                  <FormField
                    label='URL'
                    htmlFor='package_url'
                    name='package_url'
                  // validate={emailValidation}
                  // required={true}
                  // onBlur={checkServerStatus}
                  // margin={{ right: 'small' }}
                  >
                    <TextInput
                      id='package_url'
                      name='package_url'
                      type='package_url'
                      placeholder='https://www.langdocs.com'
                      value={setTextInput()}
                    />
                  </FormField>
                </Box>}
                {/* <Box>
                  {isServerReachable !== undefined &&
                    isServerReachable !== null &&
                    isServerReachable === false && (
                      <Close style={{ marginTop: '37px' }} color='red' />
                    )}
                  {isServerReachable && (
                    <Checkmark color='green' style={{ marginTop: '37px' }} />
                  )}
                </Box> */}
              </Box>
              {/* {isServerReachable !== undefined &&
                isServerReachable !== null &&
                isServerReachable === false && (
                  <Text color={'red'}>Please Enter valid url</Text>
                )} */}
            </Box>

            <FormField
              label='Version'
              htmlFor='package_version'
              name='package_version'
            // validate={emailValidation}
            // required={true}
            // value={()=>{
            //   let val = javaLibraries.filter((obj)=>{
            //     return obj.package_name == formValues.package_name;
            //   })

            //   return val.package_version;
            // }}
            >
              {javaLibWithVersionsProp.some(lib => lib.package_name === formValues.package_name.package_name) ?
                (<Select
                  placeholder='Package version'
                  id='package_version'
                  name='package_version'
                  options={setSelectValue()}

                />) : (<TextInput
                  id='package_version'
                  name='package_version'
                  type='text'
                  placeholder='Version to be added'
                />)
              }

            </FormField>
            <Button
              label='Add Rules'
              primary
              type='submit'
              margin={{ top: 'small' }}
            // disabled={
            //   isServerReachable === null || isServerReachable === false
            // }
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
const SpinnerLayer = () => {
  return (
    <Box width={'200px'} height={'100px'}>
      <Box margin={{ top: '10px', left: '10px' }}>
        <Text>Loading Data Please wait</Text>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Spinner margin={{ top: '10px' }} message="Data is loading" />
      </Box>
    </Box>
  )
}

const Rules = () => {
  const [showAddLanguageRules, setShowAddLanguageRules] = useState(false);
  const [showJavaLibrariesRules, setShowJavaLibrariesRules] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [status, setStatus] = useState('unknown');
  const [javaLibraries, setJavaLibraries] = useState([]);
  const [javaLibWithVersions, setJavaLibWithVersions] = useState([]);
  const [onClickCard, setOnClickCard] = useState(false);

  const packages = [
    { package_name: 'Mchange commons java', package_url: 'https://www.mchange.com/projects/mchange-commons-java-versions/{package_version}/apidocs/deprecated-list.html', package_version: ['0.2.19', '0.2.20'] },
    { package_name: 'Apache Tomcat', package_url: 'https://tomcat.apache.org/tomcat-{package_version}-doc/api/deprecated-list.html', package_version: ['11.0', '10.0', '9.0', '8.0', '7.0'] },
    { package_name: 'Angus Activation', package_url: 'https://eclipse-ee4j.github.io/angus-activation/api/deprecated-list.html', package_version: [] },
    { package_name: 'ECJ', package_url: 'https://javadoc.io/doc/org.eclipse.jdt.core.compiler/ecj/latest/deprecated-list.html', package_version: [] },
    { package_name: 'JavaHamcrest', package_url: 'https://hamcrest.org/JavaHamcrest/javadoc/2.2/deprecated-list.html', package_version: [] },
  ]

  const navigate = useNavigate();

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };
  const onAddRules = () => {
    setShowAddLanguageRules(!showAddLanguageRules);
  };
  const onCloseRules = () => {
    setShowAddLanguageRules(false);
  };

  const onAddJavaLibraries = () => {
    setShowJavaLibrariesRules(!showJavaLibrariesRules);
  };
  const onCloseJavaLibraries = () => {
    setShowJavaLibrariesRules(false);
  };
  let packageWithVersions = [];
  let packageNames = [];
  useEffect(() => {
    // setJavaLibraries(packages);
    // let packageWithVersions = javaLibraries.filter(lib => lib.package_version.length > 0);

    // setJavaLibWithVersions(packageWithVersions);
    RulesService.getJavaLibrariesDetails()
      .then(res => {
        // console.log(res);
        setJavaLibraries(res.data);
        // setJavaLibraries(packages);
        packageWithVersions = res.data.filter(lib => lib.package_version.length > 0);
        console.log(packageWithVersions);
        // for (let i = 0; i < res.data.length; i++) {
        //   packageNames.push(res.data[i].package_name);
        // }
        packageNames = res.data.map(pkg => pkg.package_name);
        console.log(packageNames);
        setJavaLibWithVersions(packageWithVersions);
        setOnClickCard(true);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <Box direction='row'>
      {!onClickCard && <Layer >
        <SpinnerLayer />
      </Layer>}
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
      <SideBar data-testid='sidebar' />
      <Box
        gap='medium'
        direction='row'
        align='start'
        style={{ minWidth: '70%' }}
        margin={{ top: 'large', left: 'large' }}
      >
        <Card
          pad='medium'
          width='27%'
          margin='small'
          height='35vh'
          style={{ cursor: 'pointer' }}
          onClick={onAddRules}
        >
          <Compliance size='xlarge' color={Colors.primaryBrand} />
          <Header
            style={{ fontWeight: 'bold', fontSize: '24px' }}
            margin={{ top: 'medium' }}
          >
            Add SDK Rules
          </Header>
          <Box direction='row' margin={{ top: 'medium' }}>
            <Text>Click to add rules</Text>
          </Box>
        </Card>

        <Card
          pad='medium'
          width='27%'
          margin='small'
          height='35vh'
          style={{ cursor: 'pointer' }}
          onClick={onClickCard ? onAddJavaLibraries : undefined}
        >

          <Java size='xlarge' color={Colors.primaryBlue400} />
          <Header
            style={{ fontWeight: 'bold', fontSize: '24px' }}
            margin={{ top: 'medium' }}
          >
            Add Java Libraries
          </Header>
          <Box direction='row' margin={{ top: 'medium' }}>
            <Text>Click to add rules</Text>
          </Box>
        </Card>
      </Box>

      <Box align='start' margin={{ top: 'medium', bottom: 'small' }}>
        {showAddLanguageRules && (
          <Layer modal onClickOutside={onCloseRules} onEsc={onCloseRules}>
            <AddRulesForm
              closeLayer={onCloseRules}
              setNotificationVisible={setNotificationVisible}
              setNotificationMessage={setNotificationMessage}
              setStatus={setStatus}
            />
          </Layer>
        )}
        {showJavaLibrariesRules && (
          <Layer
            modal
            onClickOutside={onCloseJavaLibraries}
            onEsc={onCloseJavaLibraries}
          >
            <AddJavaLibrariesForm
              closeLayer={onCloseJavaLibraries}
              setNotificationVisible={setNotificationVisible}
              setNotificationMessage={setNotificationMessage}
              setStatus={setStatus}
              javaLibrariesProp={javaLibraries}
              javaLibWithVersionsProp={javaLibWithVersions}
            />
          </Layer>
        )}
      </Box>
    </Box>
  );
};

export default Rules;
