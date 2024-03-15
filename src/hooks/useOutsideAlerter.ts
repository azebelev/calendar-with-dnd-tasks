import { MutableRefObject, useEffect } from 'react';

export function useOutsideAlerter(
  ref: MutableRefObject<any>,
  setModalOpen: (value: boolean) => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setModalOpen]);
}
