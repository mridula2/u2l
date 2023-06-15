import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationUtils from '../utils/AuthenticationUtils';

const AuthenticatedRoute = () => {
  const auth = AuthenticationUtils.isUserLoggedIn();
  return auth ? <Outlet /> : <Navigate to='/' />;
};

export default AuthenticatedRoute;
