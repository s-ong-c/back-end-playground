import { useContext } from 'react';
import SongbarContext from './SongbarContext';

const useSongbar = () => {
  const songbar = useContext(SongbarContext);
  const { set, value } = songbar;
  return [set, value] as [typeof set, typeof value];
};

export default useSongbar;
