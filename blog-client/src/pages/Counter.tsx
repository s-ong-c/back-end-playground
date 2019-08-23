import * as React from 'react';

const { useReducer } = React;
interface CounterProps{}
interface Action {
    type: String;
}
function reducer(state:any, action:Action) {
    // action.type 에 따라 다른 작업 수행
    switch (action.type) {
      case 'INCREMENT':
        return { value: state.value + 1 };
      case 'DECREMENT':
        return { value: state.value - 1 };
      default:
        return state;
    }
  }
const Counter: React.SFC<CounterProps> = props => {
    const [state, dispatch] = useReducer(reducer, {value: 0});
  return(
         <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b> 입니다.
            </p>
            <button onClick={() => dispatch({type: 'INCREMENT'})}>+1</button>
            <button onClick={() =>  dispatch({type: 'DECREMENT'})}>-1</button>
        </div>
    );
  };

export default Counter;