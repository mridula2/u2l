import { Route,Routes } from "react-router-dom";
import axios from "axios";

import HomePage from "../pages/Home/HomePage";
import LogDetails from "../pages/LogDetails";
import LoginPage from "../pages/LoginPage";
import PdfPreview from "../pages/pdf/PdfPreview";
import PdfView from "../pages/pdf/PdfViewer";
import Review from "../pages/Review";
import ProjectDetails from "../pages/ProjectDetails";
import Dashboard from "../pages/Dashboard";
import WizardValidationExample from "../components/Wizard/Wizard";


const AppRouting = () => {
    // let location = useLocation();
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logdetails" element={<LogDetails />} />
        <Route path="/pdfpreview" element={<PdfPreview />} />
        <Route path="/pdfview" element={<PdfView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectdetails" element={<ProjectDetails />} />       
        <Route path="/review" element={<Review />} /> 
        <Route path="/wizard" element={<WizardValidationExample />} />  
        
      </Routes>
    );
  };
  
  export default AppRouting;