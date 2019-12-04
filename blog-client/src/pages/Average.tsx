import * as React from 'react';

const { useState } = React;
const getAverage = (numbers: number[]) => {
  console.log('getAverage');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};
interface AverageProps {}

const Average: React.FC<AverageProps> = props => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  const onInsert = (e: React.FormEvent<HTMLButtonElement>) => {
    setNumber('');
  };
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {getAverage(list)}
      </div>
    </div>
  );
};

export default Average;
