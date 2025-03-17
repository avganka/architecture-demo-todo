import type { ServiceRegistry } from '@/core/services/root/RootService';
import { createContext, useContext } from 'react';

export interface RootProviderProps {
  children?: React.ReactNode;
  rootService: ServiceRegistry;
}

const RootContext = createContext<ServiceRegistry | undefined>(undefined);

export const useRoot = () => {
  const root = useContext(RootContext);
  if (!root) {
    throw new Error('The root store has been used out of context');
  }
  return root;
};

export const RootProvider = (props: RootProviderProps) => {
  const { children, rootService } = props;

  return (
    <RootContext.Provider value={rootService}>{children}</RootContext.Provider>
  );
};
