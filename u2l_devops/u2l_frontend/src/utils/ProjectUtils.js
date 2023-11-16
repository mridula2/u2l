const findSummary = (datum) => {
  if (datum.analysis_status === 'PENDING') {
    return 'Assessment In Progress';
  } else if (datum.analysis_status === 'SUCCESS') {
    return 'Successful Assessment';
  } else if (datum.analysis_status === 'FAILURE') {
    return 'Failed Assessment';
  } else {
    return 'Analysis status unknown';
  }
};

const iconMapping = (analysis_status) => {
  if (analysis_status === 'SUCCESS') {
    return 'OK';
  } else if (analysis_status === 'FAILURE') {
    return 'Critical';
  } else if (analysis_status === 'PENDING') {
    return 'Started';
  }
};

const ProjectUtils = {
  findSummary,
  iconMapping,
};

export default ProjectUtils;
