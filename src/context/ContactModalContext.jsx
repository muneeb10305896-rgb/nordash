'use client';
import { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext();

export function ContactModalProvider({ children }) {
  const [modalType, setModalType] = useState(null);

  return (
    <ContactModalContext.Provider value={{ modalType, setModalType }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}
