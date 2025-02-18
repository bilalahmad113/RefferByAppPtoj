import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const Provider = ({ children }) => {
  const [contaxtprofileData, setContaxtProfile] = React.useState([]);

  const actions = {
    updateProfileData:(payload)=>{
      setContaxtProfile(payload)
    }
  };

  return (
    <CartContext.Provider value={{
      ...actions, contaxtprofileData
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useAuth must be inside a Provider with a value');
  }
  return context;
};
