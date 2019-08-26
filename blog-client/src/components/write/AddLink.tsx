import * as React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import useInput from '../../lib/hooks/useInput';
import RoundButton from '../common/RoundButton';
import palette from '../../lib/styles/palette';

const AddLinkBlock = styled.div`
  position: absolute;
  & > .wrapper {
    margin-top: 1rem;
    width: 20rem;
    background: ${palette.gray8};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    /* .title {
      font-weight: bold;
      margin-bottom: 1rem;
      color: ${palette.gray8};
    } */
    form {
      width: 100%;
      display: flex;
      align-items: center;
      background: ${palette.gray8};
      input {
        flex: 1;
        border: none;
        outline: none;
        background: ${palette.gray8};
        font-family: 'Fira Mono', monospace;
        color: white;
        border-bottom: 1px inset ${palette.gray5};
        font-size: 1rem;
        margin-right: 0.5rem;
        line-height: 1.5;
        padding: 0;
        &::placeholder {
            color: white;
        }
      }
    }
    padding: 1.25rem 1rem;
  }
`;
interface AddLinkProps{
    left: number;
    top: number;
    onConfirm: (link: string) => void;
    onClose: () => void;
}

const { useCallback } = React;
const AddLink: React.SFC<AddLinkProps> = ({ 
    left,
    top,
    onConfirm,
    onClose,
}) => {
    const [value, onChange] = useInput('');
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onConfirm(value);
    },[value]);
    return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <AddLinkBlock
        style={{
          left,
          top,
        }}
      >
        <div className="wrapper">
          <form onSubmit={onSubmit}>
            <input
              value={value}
              onChange={onChange}
              placeholder="Paste or type link...."
            />
            <RoundButton color="darkGray" size="SMALL">
              OK
            </RoundButton>
          </form>
        </div>
      </AddLinkBlock>
    </OutsideClickHandler>
    );
    };

export default AddLink;