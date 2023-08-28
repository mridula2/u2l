const getTodaysDate = () => {
  const date = new Date();
  return date
    .toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, '-');
};

const getAnalysisType = (analysis) => {
  if (analysis === 'javaanalysis') {
    return 'Java Analysis';
  } else if (analysis === 'canalysis') {
    return 'C Analysis';
  } else if (analysis === 'shellanalysis') {
    return 'Shell Analysis';
  }
};

const getTotalArtefacts = (array) => {
  let sum = 0;
  for (const element of array) {
    sum += element.number;
  }
  return sum;
};

const getEffort = (percent) => {
  if (0 <= percent <= 10) {
    return 'Vert Low Effort';
  } else if (11 <= percent <= 30) {
    return 'Low Effort';
  } else if (31 <= percent <= 60) {
    return 'Medium Effort';
  } else if (61 <= percent <= 80) {
    return 'High Effort';
  } else if (80 <= percent <= 100) {
    return 'Very High Effort';
  }
};

const PdfUtils = {
  getAnalysisType,
  getEffort,
  getTodaysDate,
  getTotalArtefacts,
};

export default PdfUtils;
