'use client';
import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type TypedState } from 'store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<TypedState>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
