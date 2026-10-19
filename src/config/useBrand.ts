import { useSyncExternalStore } from 'react';
import { getBrand, subscribeBrand, type Brand } from './branding';

export function useBrand(): Brand {
  return useSyncExternalStore(subscribeBrand, getBrand, getBrand);
}
