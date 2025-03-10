import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type TypedState } from 'store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<TypedState>(undefined);
  // eslint-disable-next-line react-compiler/react-compiler
  if (!storeRef.current) {
    // eslint-disable-next-line react-compiler/react-compiler
    storeRef.current = makeStore();
  }
  // eslint-disable-next-line react-compiler/react-compiler
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
