const findSummary = (datum) => {
  if (datum.analysis_status === 'analysis started') {
    return 'Assessment In Progress';
  } else if (datum.analysis_status === 'analysis successful') {
    return 'Successful Assessment';
  } else if (datum.analysis_status === 'analysis failed') {
    return 'Failed Assessment';
  } else {
    return 'Analysis status unknown';
  }
};

const iconMapping = (analysis_status) => {
  if (analysis_status === 'analysis successful') {
    return 'OK';
  } else if (analysis_status === 'analysis failed') {
    return 'Critical';
  } else if (analysis_status === 'analysis started') {
    return 'Started';
  }
};

const ProjectUtils = {
  findSummary,
  iconMapping,
};

export default ProjectUtils;
