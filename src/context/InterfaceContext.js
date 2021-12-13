import React from 'react';

export const defaultInterfaceContext = {
  isOpen: false,
  toggle: () => {},
  pageURL: '',
};

export default React.createContext(defaultInterfaceContext);
