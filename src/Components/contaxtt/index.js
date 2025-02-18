import React from 'react';
import {Provider} from './cartcontext';

export const ContextProvider = ({children}) => {
  return (
    <Provider>
      {children}
    </Provider>
  );
};
