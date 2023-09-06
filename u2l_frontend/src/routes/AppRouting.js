import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../pages/Login/LoginPage';
import LogDetails from '../pages/LogDetails';
import PdfPreview from '../pages/pdf/PdfPreview';
import PdfView from '../pages/pdf/PdfViewer';
import Review from '../pages/Review';
import ProjectDetails from '../pages/ProjectDetails';
import Dashboard from '../pages/Dashboard';
import WizardValidationExample from '../components/Wizard/Wizard';
import SignUp from '../pages/SignUp';
import Documentation from '../pages/Documentation';
import Contact from '../pages/Contact';
import AboutUs from '../pages/AboutUs';
import AuthenticatedRoute from './AuthenticatedRoute';
import AuthenticationUtils from '../utils/AuthenticationUtils';
import AdminPursuitCustomerAuthorizedRoute from './AdminPursuitCustomerAuthorizedRoute';

const AppRouting = () => {
  axios.interceptors.request.use(function (config) {
    const token = AuthenticationUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  // let location = useLocation();
  return (
    <Routes>
      {/* Everyone can access these routes */}
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/aboutus' element={<AboutUs />} />
      {/* Authenticated users only */}
      <Route element={<AuthenticatedRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/logdetails' element={<LogDetails />} />
        <Route path='/pdfpreview' element={<PdfPreview />} />
        <Route path='/pdfview' element={<PdfView />} />
        <Route path='/projectdetails' element={<ProjectDetails />} />
        <Route path='/review' element={<Review />} />
        <Route path='/wizard' element={<WizardValidationExample />} />
        {/* Only users with role admin, pursuit or customer can access */}
        <Route element={<AdminPursuitCustomerAuthorizedRoute />}>
          <Route path='/documentation' element={<Documentation />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouting;
