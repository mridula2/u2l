import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PdfDocument from "./PdfDocument";

const PdfView = () => {
  const location = useLocation();

  return (
    <PDFViewer width="99.5%" height="100%">
      {/* <PdfDocument
        projectDetails={location.state.projectDetails}
        pieChart2DataURL={location.state.pieChart2DataURL}
      /> */}
      <PdfDocument pieChart1DataURL={location.state.pieChart1DataURL} pieChart2DataURL={location.state.pieChart2DataURL} projectDetails={location.state.projectDetails}/>
    </PDFViewer>
  );
};

export default PdfView;
