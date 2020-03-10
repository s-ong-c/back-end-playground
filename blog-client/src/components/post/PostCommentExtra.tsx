import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import PopupBase from '../common/PopupBase';

export type PostCommentExtraProps = {
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  visible: boolean;
  title?: string;
  onConfirm?: () => any;
  onCancel?: () => any;
  onRemove: () => any;
};
const PopupOKCancelBlock = styled.div`
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${palette.gray8};
    line-height: 1.5;
    font-weight: bold;
  }
  .message {
    line-height: 1.5;
    font-size: 1rem;
    color: ${palette.gray7};
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .button-area {
    display: flex;
    justify-content: flex-end;
    button + button {
      margin-left: 0.75rem;
    }
  }
`;
function PostCommentExtra({
  visible,
  onClose,
  title,
  onConfirm,
  onRemove,
}: PostCommentExtraProps) {
  return (
    <PopupBase isCommentOptions={true} visible={visible}>
      <PopupOKCancelBlock>
        <OutsideClickHandler onOutsideClick={onClose}>
          {title && <h3>{title}</h3>}
          <Block>
            <ul>
              <li>
                <div className="email">somony9292@gmail.com</div>
              </li>
              <li>
                <Link to="/@songc">Go Post</Link>
              </li>
              <li>
                <Link to="/@songc">수정하기</Link>
              </li>
              <li>
                <span onClick={onRemove}>삭제하기</span>
              </li>
            </ul>
            <div className="contact">
              <div className="email" onClick={onClose}>
                Cancel
              </div>
            </div>
          </Block>
        </OutsideClickHandler>
      </PopupOKCancelBlock>
    </PopupBase>
  );
}

const Block = styled.div`
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: white;
  color: ${palette.gray9};
  align-items: center;
  text-align: center;
  transform-origin: top right;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    font-weight: 600;

    font-size: 0.875rem;
    padding: 0.75rem 1rem;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
  li + li {
    border-top: 1px solid ${palette.gray1};
  }
  .contact {
    border-top: 1px solid #f1f3f5;
    padding: 1rem;
    h5 {
      margin: 0;
      font-size: 0.75rem;
    }
    .email {
      color: ${palette.gray8};
      font-size: 0.75rem;
    }
  }
`;

export default PostCommentExtra;
