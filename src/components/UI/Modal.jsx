import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// ovde koristim drugu osobinu useEffecta, umesto forwardedRef(useRef), koristim useEffect to syncronize parent prop and useRef hook inside that component
export default function Modal({ children, open, className = '' }) {
  const dialog = useRef();
  useEffect(() => {
    // patter, jer ce ova cb funkcija u return da zapamti tu vrednost (closure), izvrsice se kasnije od useEffect, kad se sledeca useEffect bude izvrsavala
    const modal = dialog.current;
    console.log(1);
    if (open) {
      modal.showModal();
    }
    // jedan nacin da se zatvori modal
    // else {
    //   dialog.current.close();
    // }

    // drugi nacin  da se zatvori modal
    return () => {
      console.log(2);
      return modal.close();
    };
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
