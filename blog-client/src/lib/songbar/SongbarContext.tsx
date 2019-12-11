import React, { createContext, useState } from 'react';
import Songbar from './Songbar';

interface SongbarContextValue {
  value: number;
  set(value: number): void;
}
const SongbarContext = createContext<SongbarContextValue>({
  value: 0,
  set: () => {},
});

export const SongbarProvider: React.FC<{}> = ({ children }) => {
  const [value, setValue] = useState(0);
  return (
    <SongbarContext.Provider
      value={{
        value,
        set: setValue,
      }}
    >
      <Songbar />
      {children}
    </SongbarContext.Provider>
  );
};

export default SongbarContext;
