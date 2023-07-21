import { Route,Routes } from "react-router-dom";
import axios from "axios";
import LoginPage from "../pages/Login/LoginPage";
import LogDetails from "../pages/LogDetails";
import PdfPreview from "../pages/pdf/PdfPreview";
import PdfView from "../pages/pdf/PdfViewer";
import Review from "../pages/Review";
import ProjectDetails from "../pages/ProjectDetails";
import Dashboard from "../pages/Dashboard";
import WizardValidationExample from "../components/Wizard/Wizard";
import SignUp from "../pages/SignUp";
import Documentation from "../pages/Documentation";
import Contact from '../pages/Contact';
import AboutUs from "../pages/AboutUs";


const AppRouting = () => {
    // let location = useLocation();
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logdetails" element={<LogDetails />} />
        <Route path="/pdfpreview" element={<PdfPreview />} />
        <Route path="/pdfview" element={<PdfView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectdetails" element={<ProjectDetails />} />       
        <Route path="/review" element={<Review />} /> 
        <Route path="/wizard" element={<WizardValidationExample />} />  
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/documentation" element={<Documentation />} />  
        <Route path="/contact" element={<Contact />} />  
        <Route path="/aboutus" element={<AboutUs />} />  
             
      </Routes>
    );
  };
  
  export default AppRouting;