import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GlobalDataType = {
  url:string
};

// Létrehozzuk a context-et
type GlobalDataContextType = {
  globalData: GlobalDataType;
  setGlobalData: React.Dispatch<React.SetStateAction<GlobalDataType>>;
};

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [globalData, setGlobalData] = useState<GlobalDataType>({
    url: ""
  });

  return (
    <GlobalDataContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = (): GlobalDataContextType => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};
