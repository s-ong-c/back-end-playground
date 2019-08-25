import * as React from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export interface FullPageEditorProps {}

const FullPageEditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    /* .ql-toolbar {
        width: 100%;
        position: absolute;
    } */
    .ql-container {
        height: initial;
        flex: 1;
        overflow-y: auto;
    }
`;

export default class FullPageEditor extends React.Component<
    FullPageEditorProps, 
    any
> {
  editor = React.createRef<HTMLDivElement>();

  componentDidMount() {
      const quill = new Quill(this.editor.current as Element,{
          theme: 'snow',
      });
  }
  public render() {
    return (
      <FullPageEditorWrapper>
          <div ref={this.editor} />
      </FullPageEditorWrapper>
    );
  }
}
