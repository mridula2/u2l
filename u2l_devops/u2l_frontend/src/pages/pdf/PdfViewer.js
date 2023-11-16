import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import PdfDocument from './PdfDocument';
import { Box } from 'grommet';
import { useEffect } from 'react';

const PdfView = () => {
  const location = useLocation();

  return (
    <Box width={'100vw'} height={'100vh'}>
      <PDFViewer width='99.5%' height='100%'>
        {/* <PdfDocument
        projectDetails={location.state.projectDetails}
        pieChart2DataURL={location.state.pieChart2DataURL}
      /> */}
        <PdfDocument
          pieChart1DataURL={location.state.pieChart1DataURL}
          pieChart2DataURL={location.state.pieChart2DataURL}
          radarChartDataURL={location.state.radarChartDataURL}
          barChartDataURL={location.state.barChartDataURL}
          projectDetails={location.state.projectDetails}
        />
      </PDFViewer>
    </Box>
  );
};

export default PdfView;
