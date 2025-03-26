// import { useAuthContext } from '../../hooks/useAuthContext';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import DefaultLayout from '../../Layouts/DashboardLayout';
// import routesConfig from '../../utils/routeList';
// import Login from '../../pages/Auth/Login/Login';
// import Landingpage from '../../pages/LandingPage/LandingPage';

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuthContext();
//   const isAuthenticated = user?.data?.emailVerified;
//   console.log('isAuthenticated in PrivateRoute:', isAuthenticated);
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// const RouterApp = () => {
//   const { user } = useAuthContext();
//   const isAuthenticated = user?.data?.emailVerified;

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={isAuthenticated ? <Navigate to="/dashboard/main" /> : <Login />}
//       />
//       <Route
//         path="/"
//         element={isAuthenticated ? <Navigate to="/dashboard/main" /> : <Landingpage />}
//       />
//       <Route
//         path="/"
//         element={
//           <PrivateRoute>
//             <Navigate to="/dashboard/main" />
//           </PrivateRoute>
//         }
//       />

//       {routesConfig.map((route) =>
//         route.authRequired ? (
//           <Route
//             key={route.id}
//             path={route.path}
//             element={
//               <PrivateRoute>
//                 <DefaultLayout>{route.element}</DefaultLayout>
//               </PrivateRoute>
//             }
//           />
//         ) : (
//           <Route key={route.id} path={route.path} element={route.element} />
//         ),
//       )}
//     </Routes>
//   );
// };

// export default RouterApp;
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DefaultLayout from '../../Layouts/DashboardLayout';
import routesConfig from '../../utils/routeList';
import Login from '../../pages/Auth/Login/Login';
import Landingpage from '../../pages/LandingPage/LandingPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const isAuthenticated = user?.data?.emailVerified;
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
};

const RouterApp = () => {
  const { user } = useAuthContext();
  const isAuthenticated = user?.data?.emailVerified;
  const location = useLocation();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={location.state?.from?.pathname || '/dashboard/main'} />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/" element={<Landingpage />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Navigate to={'/dashboard/main'} /> : <Login />}
      />

      {/* Private Routes */}
      {routesConfig.map((route) =>
        route.authRequired ? (
          <Route
            key={route.id}
            path={route.path}
            element={
              <PrivateRoute>
                <DefaultLayout>{route.element}</DefaultLayout>
              </PrivateRoute>
            }
          />
        ) : (
          <Route key={route.id} path={route.path} element={route.element} />
        ),
      )}
    </Routes>
  );
};

export default RouterApp;
