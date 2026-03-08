// src/hooks/useNetwork.js
import { useEffect } from 'react';
import useUIStore from '@store/uiStore';

/** Syncs navigator online/offline events into UIStore */
export const useNetwork = () => {
  const { isOnline, setOnline } = useUIStore();

  useEffect(() => {
    const on  = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online',  on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online',  on);
      window.removeEventListener('offline', off);
    };
  }, [setOnline]);

  return isOnline;
};