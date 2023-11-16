import React, { useState, useContext } from "react";

// import { ThemeContext } from "styled-components";
import {
  Box,
  FormField,
  Heading,
  FileInput,
  Button,
  Select,
  Text,
  Spinner,
  Layer,
  TextInput,
} from "grommet";
import HeaderExample from "../components/navbars/AppHeader";
import classes from './Styling.module.css';

const ProjectDetails = () => {
  // const theme = useContext(ThemeContext);
  const [numFiles, setNumFiles] = useState(0);
  const [showhide, setShowHide] = useState("");
  const [fileInputDisabled, setFileInputDisabled] = useState(true);
  const [proceedButtonDisabled, setProceedButtonDisabled] = useState(true);
  const [showProjectDetails, setShowProjectDetails] = useState(true);
  const [showOSDetails, setShowOSDetails] = useState(false);
  const [showAnalysisType, setShowAnalysisType] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleshowhide = (event) => {
    const getLang = event.target.value;
    setFileInputDisabled(false);
    console.log(getLang);
    setShowHide(getLang);
  };

  const handleSpinner = (e) => {
    e.preventDefault();
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  };

  const handleTabs = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
    const id = event.currentTarget.id;

    if (id === "project_details") {
      setShowProjectDetails(true);
      setShowOSDetails(false);
      setShowAnalysisType(false);
    } else if (id === "os_details") {
      setShowProjectDetails(false);
      setShowOSDetails(true);
      setShowAnalysisType(false);
    } else if (id === "analysis_type") {
      setShowProjectDetails(false);
      setShowOSDetails(false);
      setShowAnalysisType(true);
    }
  };

  return (
    <Box>
      <HeaderExample />
      <Box direction="row-responsive" responsive={true} flex="shrink">
        <Box direction="column" width="small" responsive={true} height="91vh">
          <Button
            label="Code Assessment"
            href="/dashboard"
            className={classes.btn}
          />
          <Button
            label="Project Details"
            href="/projectdetails"
            className={classes.btn}
          />
          <Button
            label="OS Details"
            id="os_details"
            onClick={(event) => handleTabs(event)}
            className={classes.btn}
          />
          <Button
            label="Analysis Type"
            id="analysis_type"
            onClick={(event) => handleTabs(event)}
            className={classes.btn}
          />
          <Button label="Review" className={classes.btn} />
          <Button margin={{left:"small"}} label="Review and Create" href="/review" className={classes.btn} />
        </Box>

        <Box align="center" width="60%">
          {showProjectDetails && (
            <Box>
              <h3>Project details</h3>
              <FormField
                label="Project name"
                htmlFor="project_name"
                name="project_name"
                required={true}
              >
                <TextInput
                  placeholder="Enter Value"
                  id="project_name"
                  name="project_name"
                />
              </FormField>

              <FormField
                label="Project Client"
                htmlFor="project_client"
                name="project_client"
                required={true}
              >
                <TextInput
                  placeholder="Enter Value"
                  id="project_client"
                  name="project_client"
                />
              </FormField>
              <FormField
                label="Project Manager"
                htmlFor="project_manager"
                name="project_manager"
                required={true}
              >
                <TextInput
                  placeholder="Enter Value"
                  id="project_manager"
                  name="project_manager"
                />
              </FormField>
              <FormField
                label="Application Name"
                htmlFor="application_name"
                name="application_name"
                required={true}
              >
                <TextInput
                  placeholder="Enter Application Name"
                  id="application_name"
                  name="application_name"
                />
              </FormField>
              <Box align="end" margin={{ Top: "small" }}>
                <Button>Next</Button>
              </Box>
            </Box>
          )}

          {showOSDetails && (
            <Box>
              <h3>OS details</h3>
              <FormField
                label="Source OS"
                htmlFor="source_os"
                name="source_os"
                required={true}
              >
                <TextInput
                  placeholder="Enter Value"
                  id="source_os"
                  name="source_os"
                />
              </FormField>
              <FormField
                label="Source OS version"
                htmlFor="source_os_version"
                name="source_os_version"
              >
                <TextInput
                  placeholder="Enter Value"
                  id="source_os_version"
                  name="source_os_version"
                />
              </FormField>
              <FormField
                label="Target OS"
                htmlFor="target_os"
                name="target_os"
                required={true}
              >
                <TextInput
                  placeholder="Enter Value"
                  id="target_os"
                  name="target_os"
                />
              </FormField>
              <FormField
                label="Target OS version"
                htmlFor="target_os_version"
                name="target_os_version"
                required={true}
              >
                <TextInput
                  placeholder="Enter Value"
                  id="target_os_version"
                  name="target_os_version"
                />
              </FormField>

              <Box
                direction="row"
                gap="large"
                margin={{ left: "medium", top: "small" }}
              >
                <Button>Previous</Button>
                <Button>Next</Button>
              </Box>
            </Box>
          )}

          {showAnalysisType && (
            <Box>
              <Heading level={2} size="small" marginTop="0">
                {/* margin="2"  for heading if needed*/}
                Analysis Type
              </Heading>

              <FormField
                htmlFor="analysis_type"
                name="analysis_type"
                label="Type of analysis"
              >
                <Select
                  placeholder="Analysis Type"
                  id="analysis_type"
                  name="analysis_type"
                  options={[
                    "Java",
                    "Shell",
                    "C",
                    "C++",
                    "Pro*C",
                    "C/Pro*C",
                    "C++/Pro*C",
                  ]}
                  onChange={(e) => handleshowhide(e)}
                />
              </FormField>

              {/* Div after Java Slelected */}
              {showhide === "Java" && (
                <Box width="medium">
                  <FormField
                    label="Source JDK"
                    htmlFor="source_jdk"
                    name="source_jdk"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_jdk"
                      name="source_jdk"
                    />
                  </FormField>
                  <FormField
                    label="Target JDK"
                    htmlFor="target_jdk"
                    name="target_jdk"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_jdk"
                      name="target_jdk"
                    />
                  </FormField>

                  <FormField
                    label="Source JSP"
                    htmlFor="source_jsp"
                    name="source_jsp"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_jsp"
                      name="source_jsp"
                    />
                  </FormField>
                  <FormField
                    label="Target JSP"
                    htmlFor="target_jsp"
                    name="target_jsp"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_jsp"
                      name="target_jsp"
                    />
                  </FormField>

                  <FormField
                    label="Source Servlet"
                    htmlFor="source_servlet"
                    name="source_servlet"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_servlet"
                      name="source_servlet"
                    />
                  </FormField>
                  <FormField
                    label="Target Servlet"
                    htmlFor="target_servlet"
                    name="target_servlet"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_servlet"
                      name="target_servlet"
                    />
                  </FormField>
                </Box>
              )}

              {/* Div After C selected */}
              {showhide === "C" && (
                <Box>
                  <FormField
                    label="Source Compiler"
                    htmlFor="source_compiler"
                    name="source_compiler"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_compiler"
                      name="source_compiler"
                    />
                  </FormField>
                  <FormField
                    label="Source Compiler version"
                    htmlFor="source_compiler_version"
                    name="source_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_compiler_version"
                      name="source_compiler_version"
                    />
                  </FormField>
                  <FormField
                    label="Target Compiler"
                    htmlFor="target_compiler"
                    name="target_compiler"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_compiler"
                      name="target_compiler"
                    />
                  </FormField>
                  <FormField
                    label="Target Compiler version"
                    htmlFor="target_compiler_version"
                    name="target_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_compiler_version"
                      name="target_compiler_version"
                    />
                  </FormField>
                </Box>
              )}

              {/* Div After C++ selected */}
              {showhide === "C++" && (
                <Box>
                  <FormField
                    label="Source Compiler"
                    htmlFor="source_compiler"
                    name="source_compiler"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_compiler"
                      name="source_compiler"
                    />
                  </FormField>
                  <FormField
                    label="Source Compiler version"
                    htmlFor="source_compiler_version"
                    name="source_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_compiler_version"
                      name="source_compiler_version"
                    />
                  </FormField>
                  <FormField
                    label="Target Compiler"
                    htmlFor="target_compiler"
                    name="target_compiler"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_compiler"
                      name="target_compiler"
                    />
                  </FormField>
                  <FormField
                    label="Target Compiler version"
                    htmlFor="target_compiler_version"
                    name="target_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_compiler_version"
                      name="target_compiler_version"
                    />
                  </FormField>
                </Box>
              )}

              {/* Div after Pro*C selected */}
              {showhide === "Pro*C" && (
                <Box>
                  <FormField
                    label="Source pre-compiler"
                    htmlFor="source_pre_compiler"
                    name="source_pre_compiler"
                  >
                    <TextInput
                      disabled={true}
                      placeholder="Oracle"
                      id="source_pre_compiler"
                      name="source_pre_compiler"
                    />
                  </FormField>

                  <FormField
                    label="Source pre-compiler version"
                    htmlFor="source_pre_compiler_version"
                    name="source_pre_compiler_version"
                  >
                    <TextInput
                      // disabled={true}
                      placeholder="Enter value"
                      id="source_pre_compiler_version"
                      name="source_pre_compiler_version"
                    />
                  </FormField>

                  <FormField
                    label="Target pre-compiler"
                    htmlFor="target_pre_compiler"
                    name="Target_pre_compiler"
                  >
                    <TextInput
                      placeholder="Enter value"
                      id="target_pre_compiler"
                      name="target_pre_compiler"
                    />
                  </FormField>

                  <FormField
                    label="Target pre-compiler version"
                    htmlFor="taget_pre_compiler_version"
                    name="target_pre_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter value"
                      id="target_pre_compiler_version"
                      name="target_pre_compiler_version"
                    />
                  </FormField>
                </Box>
              )}

              {/* Div after c/c++ selected */}
              {showhide === "C/C++/Pro*C" && (
                <Box>
                  <FormField
                    label="Source Compiler"
                    htmlFor="source_compiler"
                    name="source_compiler"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_compiler"
                      name="source_compiler"
                    />
                  </FormField>
                  <FormField
                    label="Source Compiler version"
                    htmlFor="source_compiler_version"
                    name="source_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_compiler_version"
                      name="source_compiler_version"
                    />
                  </FormField>
                  <FormField
                    label="Target Compiler"
                    htmlFor="target_compiler"
                    name="target_compiler"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_compiler"
                      name="target_compiler"
                    />
                  </FormField>
                  <FormField
                    label="Target Compiler version"
                    htmlFor="target_compiler_version"
                    name="target_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_compiler_version"
                      name="target_compiler_version"
                    />
                  </FormField>
                  <FormField
                    label="Source pre-compiler"
                    htmlFor="source_pre_compiler"
                    name="source_pre_compiler"
                  >
                    <TextInput
                      disabled={true}
                      placeholder="Oracle"
                      id="source_pre_compiler"
                      name="source_pre_compiler"
                    />
                  </FormField>

                  <FormField
                    label="Source pre-compiler version"
                    htmlFor="source_pre_compiler_version"
                    name="source_pre_compiler_version"
                  >
                    <TextInput
                      disabled={true}
                      placeholder="Oracle"
                      id="source_pre_compiler_version"
                      name="source_pre_compiler_version"
                    />
                  </FormField>

                  <FormField
                    label="Target pre-compiler"
                    htmlFor="target_pre_compiler"
                    name="Target_pre_compiler"
                  >
                    <TextInput
                      placeholder="Enter value"
                      id="target_pre_compiler"
                      name="target_pre_compiler"
                    />
                  </FormField>

                  <FormField
                    label="Target pre-compiler version"
                    htmlFor="taget_pre_compiler_version"
                    name="target_pre_compiler_version"
                  >
                    <TextInput
                      placeholder="Enter value"
                      id="target_pre_compiler_version"
                      name="target_pre_compiler_version"
                    />
                  </FormField>
                </Box>
              )}

              {/* Div after shell selected */}
              {showhide === "Shell" && (
                <Box>
                  <FormField
                    label="Source Shell"
                    htmlFor="source_shell"
                    name="source_shell"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_shell"
                      name="source_shell"
                    />
                  </FormField>
                  <FormField
                    label="Source Shell Version"
                    htmlFor="source_shell_version"
                    name="source_shell_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="source_shell_version"
                      name="source_shell_version"
                    />
                  </FormField>
                  <FormField
                    label="Target Shell"
                    htmlFor="target_shell"
                    name="target_shell"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_shell"
                      name="target_shell"
                    />
                  </FormField>
                  <FormField
                    label="Target Shell Version"
                    htmlFor="target_shell_version"
                    name="target_shell_version"
                  >
                    <TextInput
                      placeholder="Enter Value"
                      id="target_shell_version"
                      name="target_shell_version"
                    />
                  </FormField>
                </Box>
              )}

              <Box data-testid="test-4" width="medium" margin="0" pad="small">
                <Text>Source Code</Text>
                <FileInput
                  id="file_name"
                  name="file_name"
                  label="Source code"
                  accept=".zip"
                  messages={{
                    browse: numFiles > 0 ? "Replace file" : "Select file",
                  }}
                  disabled={fileInputDisabled}
                  required={true}
                  onChange={(event, { files }) => {
                    setNumFiles(files.length);
                    setProceedButtonDisabled(false);
                  }}
                />

                <Box
                  margin={{ top: "small", left: "small" }}
                  direction="row"
                  gap="large"
                >
                  <Button>Previous</Button>
                  <Button href="/review">Review + Create</Button>
                  <Button onClick={(e) => handleSpinner(e)}>Proceed</Button>
                </Box>
                {showSpinner && (
                  <Box>
                    <Layer model>
                      <Box pad="small">
                        <Text>File uploading in Process</Text>
                        <Box align="center">
                          <Spinner
                            message={{
                              start: "Loading data.",
                              end: "Data has been loaded.",
                            }}
                          />
                        </Box>
                      </Box>
                    </Layer>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};


export default ProjectDetails;
