import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationUtils from '../utils/AuthenticationUtils';

const getAuthorizedRoutePermission = () => {
  const authenticate = AuthenticationUtils.isUserLoggedIn();
  const role = AuthenticationUtils.getUserRole();
  return ((authenticate && role === 'admin') ||
    role === 'Pursuit' ||
    role === 'Customer');
};

const AdminPursuitCustomerAuthorizedRoute = () => {
  return getAuthorizedRoutePermission() ? <Outlet /> : <Navigate to='/' />;
};

export default AdminPursuitCustomerAuthorizedRoute;
