import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  return useContext(RouteContext);
};
