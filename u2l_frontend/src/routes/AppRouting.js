import { Route, Routes } from "react-router-dom";
import SigninPage from "../views/SigninPage";
import QualityGates from "../views/QualityGatesView";
import Notifications from "../views/Notifications";
import Help from "../views/Help";
import LogDetails from "../views/LogDetails";
import Pdf from "../views/PdfViewer";
import Dashboard from "../views/Dashboard";
import WizardValidationExample from "../components/UI/Wizard/Wizard";
import BannerNotificationInfo from "../components/UI/GlobalBannerNotification";
import PdfPreview from "../views/PdfPreview";
import PdfView from "../views/PdfViewer";

const AppRouting = () => {
  // let location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<SigninPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wizard" element={<WizardValidationExample />} />
      <Route path="/globalNotification" element={<BannerNotificationInfo />} />
      <Route path="/qualitygates" element={<QualityGates />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/help" element={<Help />} />
      <Route path="/logdetails" element={<LogDetails />} />
      <Route path="/pdf" element={<Pdf />} />
      <Route path="/pdfpreview" element={<PdfPreview />} />
      <Route path="/pdfview" element={<PdfView />} />
      
    </Routes>
  );
};

export default AppRouting;
