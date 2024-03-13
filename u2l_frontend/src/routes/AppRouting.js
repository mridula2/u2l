import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

import LoginPage from '../pages/Login/LoginPage';
import LogDetails from '../pages/LogDetails';
import PdfPreview from '../pages/pdf/PdfPreview';
import PdfView from '../pages/pdf/PdfViewer';
import Review from '../pages/Review';
import ProjectDetails from '../pages/ProjectDetails';
import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import Documentation from '../pages/Documentation';
import Contact from '../pages/Contact';
import AboutUs from '../pages/AboutUs';
import Rules from '../pages/Rules';
import jwtUtils from '../utils/jwtUtils';
import AuthenticationUtils from '../utils/AuthenticationUtils';
import WizardValidationExample from '../components/Wizard/Wizard';
import AuthenticatedRoute from './AuthenticatedRoute';
import AdminPursuitCustomerAuthorizedRoute from './AdminPursuitCustomerAuthorizedRoute';
import url from '../config/url';
import Middleware from '../pages/Middleware';

const AppRouting = () => {
  const navigate = useNavigate();
  // axios.interceptors.request.use(function (config) {
  //   const token = AuthenticationUtils.getToken();
  //   if (token) {
  //     if (jwtUtils.decodeJWTToken(token).exp < Date.now() / 1000) {
  //       console.log(`Token expired`);
  //       AuthenticationUtils.removeUserDetails();
  //       navigate('/');
  //       throw config;
  //     }
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });
  // axios.defaults.baseURL = url;
  axios.interceptors.request.use(
    (request) => {
      // console.log(request);
      const token = AuthenticationUtils.getToken();
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // axios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response && error.response.status === 401) {
  //       AuthenticationUtils.removeUserDetails();
  //       navigate('/');
  //     }
  //     return Promise.reject(error);
  //   }
  // );

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
          <Route path='/rules' element={<Rules />} />
          <Route path='/middleware' element={<Middleware />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouting;
