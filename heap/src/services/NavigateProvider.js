import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ProtectedAPI } from './ProtectedAPI'; // Adjust the import path accordingly

const NavigateContext = createContext();



export const NavigateProvider = ({ children }) => {
  const navigate = useNavigate();

  // const handleNavigation = () => {
  //   Navigate('/login', state = { showErrorAlert: true });
  // };

  useEffect(() => {
    const interceptor = ProtectedAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log(error.response);
          localStorage.removeItem("token");
          // handleNavigation();
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
