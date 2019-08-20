import * as React from 'react';

const { useReducer } = React;
interface InfoProps{}
interface Action {
    name: string;
    value:string;
}
function reducer(state:any, action:Action) {
    return {
      ...state,
      [action.name]: action.value
    };
  }
const Info: React.SFC<InfoProps> = props => {
    const [ state, dispatch] = useReducer(reducer, {
        name: '',
        nickname: ''
    });
    const { name, nickname} = state;
/*
    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        console.log('마운트 하고 싶을때만 실행한다..');
        console.log({
            name, nickname
        })
    },[name])
    */
    //seEffect 는 기본적으로 렌더링 되고난 직후마다 실행되며, 두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라집니다.

// 만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect 에서 뒷정리(cleanup) 함수를 반환해주어야 합니다.

    /* 클래스 컴포넌트일때 는 이렇게 작성한다. 
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
          doSomething();  
        }
      }
      */
    /*
    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        console.log('렌더링 완료 했다.');
        console.log({
            name, nickname
        })
    })
    */
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(e.target);
    }
  return (
    <div>
    <div>
      <input name="name" value={name} onChange={onChange} />
      <input name="nickname" value={nickname} onChange={onChange} />
    </div>
    <div>
      <div>
        <b>이름:</b> {name}
      </div>
      <div>
        <b>닉네임: </b>
        {nickname}
      </div>
    </div>
  </div>
  );
  };

export default Info;