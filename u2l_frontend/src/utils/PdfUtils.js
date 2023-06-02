const getTodaysDate = () => {
  const date = new Date();
  return date.toLocaleDateString();
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
  if (0 <= percent <= 19) {
    return 'Low Effort(It belongs to category 1 from below chart).';
  } else if (20 <= percent <= 39) {
    return 'Medium Effort(It belongs to category 2 from below chart).';
  } else if (40 <= percent <= 59) {
    return 'Average Effort(It belongs to category 3 from below chart).';
  } else if (60 <= percent <= 79) {
    return 'High Effort(It belongs to category 4 from below chart).';
  } else if (80 <= percent <= 100) {
    return 'Very High Effort(It belongs to category 5 from below chart).';
  }
};

const PdfUtils = {
  getAnalysisType,
  getEffort,
  getTodaysDate,
  getTotalArtefacts,
};

export default PdfUtils;
