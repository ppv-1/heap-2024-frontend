import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate, Navigate, useHistory } from 'react-router-dom';
import { ProtectedAPI } from './ProtectedAPI'; // Adjust the import path accordingly

const NavigateContext = createContext();

const handleNavigation = () => {
  Navigate('/login', { state : { showErrorAlert: true } });
};

var history;
// const history = useHistory();

export const NavigateProvider = ({ children }) => {
  const navigate = useNavigate();

  // const handleNavigation = () => {
  //   Navigate('/login', state = { showErrorAlert: true });
  // };

  useEffect(() => {
    const interceptor = ProtectedAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 412) {
          console.log(error.response);
          localStorage.removeItem("token");
          // window.location.href = '/login';
          // this.props.navigate("/login", {
          //   state: { showCreateAlert: true },
          // });    
          // handleNavigation();
          // const state = { showErrorAlert: true };
          localStorage.setItem("Unauthorised", true);
          // window.history.pushState(state, "", "/login");
          // window.location.reload();
          // window.location.href = '/login';
          navigate('/login', { state: { showUnauthorisedAlert: true } });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      ProtectedAPI.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
};

export const useNavigateContext = () => useContext(NavigateContext);
