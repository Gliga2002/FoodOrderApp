import { useEffect, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ovde koristim drugu osobinu useEffecta, umesto forwardedRef(useRef), koristim useEffect to syncronize parent prop and useRef hook inside that component
export default function Modal({ children, open, className = '' }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog open={open} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
