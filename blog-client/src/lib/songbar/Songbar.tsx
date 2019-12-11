import React, { useContext, useState, useEffect, useCallback } from 'react';
import './Songbar.css';
import SongbarContext from './SongbarContext';
export interface SongbarProps {}

const Songbar: React.FC<SongbarProps> = props => {
  const songbar = useContext(SongbarContext);
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [zero, setZero] = useState(false);

  const { value, set } = songbar;

  const hide = useCallback(() => {
    setHiding(true);
    setTimeout(() => {
      setHiding(false);
      setZero(true);
    }, 200);
  }, []);

  useEffect(() => {
    let timeout: number | null = null;
    if (!visible && ![0, 100].includes(value)) {
      setVisible(true);
    }
    if (value === 100) {
      timeout = setTimeout(hide, 400);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [hide, value, visible]);

  useEffect(() => {
    if (zero) {
      setZero(false);
      set(0);
    }
  }, [set, zero]);
  return (
    <div
      className={['__songbar', hiding && 'hiding', zero && 'zero'].join(' ')}
      style={{
        width: `${value}%`,
      }}
    />
  );
};

export default Songbar;
