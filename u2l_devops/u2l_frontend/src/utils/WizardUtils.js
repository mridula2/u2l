import React from 'react';

const appendFormData = (formValues) => {
  let data = new FormData();
  data.append('project_name', formValues.project_name);
  data.append('project_client', formValues.project_client);
  data.append('project_manager', formValues.project_manager);
  data.append('application_name', formValues.application_name);
  data.append('source_os', formValues.source_os);
  data.append('source_os_version', formValues.source_os_version);
  data.append('target_os', formValues.target_os);
  data.append('target_os_version', formValues.target_os_version);

  data.append('analysis_type', formValues.analysis_type);
  // --------------------------------Java------------------------------------------ //
  if (formValues.analysis_type === 'Java') {
    data.append('source_jdk', formValues.source_jdk);
    data.append('target_jdk', formValues.target_jdk);
    data.append('source_jsp', formValues.source_jsp);
    data.append('target_jsp', formValues.target_jsp);
    data.append('source_servlet', formValues.source_servlet);
    data.append('target_servlet', formValues.target_servlet);
    data.append('framework', formValues.framework);
    data.append(
      'source_framework_version',
      formValues.source_framework_version
    );
    data.append(
      'target_framework_version',
      formValues.target_framework_version
    );
    // --------------------------------C/C++/Pro*C------------------------------------------ //
  } else if (formValues.analysis_type === 'C/C++/Pro*C') {
    data.append('source_compiler', formValues.source_compiler);
    data.append('source_compiler_version', formValues.source_compiler_version);
    data.append('target_compiler', formValues.target_compiler);
    data.append('target_compiler_version', formValues.target_compiler_version);
    data.append('source_pre_compiler', formValues.source_pre_compiler);
    data.append('source_pre_compiler_version', formValues.source_pre_compiler_version);
    data.append('target_pre_compiler', formValues.target_pre_compiler);
    data.append('target_pre_compiler_version', formValues.target_pre_compiler_version);
    // --------------------------------Pro*C------------------------------------------ //
  } else if (formValues.analysis_type === 'Pro*C') {
    data.append('source_pre_compiler', formValues.source_pre_compiler);
    data.append('source_pre_compiler_version', formValues.source_pre_compiler_version);
    data.append('target_pre_compiler', formValues.target_pre_compiler);
    data.append('target_pre_compiler_version', formValues.target_pre_compiler_version);
    // --------------------------------C------------------------------------------ //
  } else if (formValues.analysis_type === 'C') {
    data.append('source_compiler', formValues.source_compiler);
    data.append('source_compiler_version', formValues.source_compiler_version);
    data.append('target_compiler', formValues.target_compiler);
    data.append('target_compiler_version', formValues.target_compiler_version);
    // --------------------------------C++------------------------------------------ //
  } else if (formValues.analysis_type === 'C++') {
    data.append('source_compiler', formValues.source_compiler);
    data.append('source_compiler_version', formValues.source_compiler_version);
    data.append('target_compiler', formValues.target_compiler);
    data.append('target_compiler_version', formValues.target_compiler_version);
  }
    // --------------------------------Shell---------------------------------------- // 
  else if (formValues.analysis_type === 'Shell') {
    data.append('source_shell', formValues.source_shell);
    data.append('source_shell_version', formValues.source_shell_version);
    data.append('target_shell', formValues.target_shell);
    data.append('target_shell_version', formValues.target_shell_version);
  }
   // ---------------------------------C/Pro+C-------------------------------------- // 
  else if (formValues.analysis_type === 'C/Pro*C') {
    data.append('source_compiler', formValues.source_compiler);
    data.append('source_compiler_version', formValues.source_compiler_version);
    data.append('target_compiler', formValues.target_compiler);
    data.append('target_compiler_version', formValues.target_compiler_version);
    data.append('source_pre_compiler', formValues.source_pre_compiler);
    data.append('source_pre_compiler_version', formValues.source_pre_compiler_version);
    data.append('target_pre_compiler', formValues.target_pre_compiler);
    data.append('target_pre_compiler_version', formValues.target_pre_compiler_version);
  }
   // ---------------------------------C++/Pro*C------------------------------------ // 
  else if (formValues.analysis_type === 'C++/Pro*C') {
    data.append('source_compiler', formValues.source_compiler);
    data.append('source_compiler_version', formValues.source_compiler_version);
    data.append('target_compiler', formValues.target_compiler);
    data.append('target_compiler_version', formValues.target_compiler_version);
    data.append('source_pre_compiler', formValues.source_pre_compiler);
    data.append('source_pre_compiler_version', formValues.source_pre_compiler_version);
    data.append('target_pre_compiler', formValues.target_pre_compiler);
    data.append('target_pre_compiler_version', formValues.target_pre_compiler_version);
  }

  data.append('file_name', formValues.file_name[0]);
  console.log(formValues);
  // console.log(formValues.file_name[0]);

  return data;
};

const WizardUtils = {
  appendFormData,
};

export default WizardUtils;
