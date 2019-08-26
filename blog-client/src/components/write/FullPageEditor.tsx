import * as React from 'react';
import styled from 'styled-components';
import Quill from 'quill';
// import 'highlight.js/styles/atom-one-dark.css';
import 'quill/dist/quill.snow.css';
import TextareaAutosize from 'react-textarea-autosize';
import MarkdownShortcuts from '../../lib/quill/markdownShortcuts';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
export interface FullPageEditorProps {}
export interface FullPageEditorState {
    editorFocus: boolean;

}
const FullPageEditorWrapper = styled.div`
    /* display: flex;
    flex-direction: column;
    height: 100%; */
    /* .ql-toolbar {
        width: 100%;
        position: absolute;
    } */
    /* .ql-container {
        height: initial;
        flex: 1;
        overflow-y: auto;
    } */
    width: 768px;
    margin: 0 auto;
    padding-top: 6rem;
`;

const TitleTextarea = styled(TextareaAutosize)`
  padding: 0;
  font-size: 2.5rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: ${palette.gray9};
  &::placeholder {
    color: ${palette.gray5};
  }
`;
const Editor = styled.div`
    margin-top: 2rem;
    position: relative;
    .ql-container {
        font-family: inherit;
    }
    .ql-editor {
        padding: 0;
        font-size: 1.3125rem;
        font-family: inherit;
        line-height: 1.875;
        .ql-syntax {
            background: ${palette.gray9};
            color: white;
            font-size: 1.125rem;
            padding: 1rem;
            font-family: 'Fira Mono', monospace;
        }
    }
    .ql-editor.ql-blank::before {
        left: 0px;
        color: ${palette.gray5};
    }
`;

export default class FullPageEditor extends React.Component<
    FullPageEditorProps, 
    FullPageEditorState
> {
    editor = React.createRef<HTMLDivElement>();
    titleTextarea: HTMLTextAreaElement | null = null;
    quill: Quill | null = null;
    state = {
        editorFocus: false,
    }
    componentDidMount() {
            // set focus to title
        if (this.titleTextarea) {
            this.titleTextarea.focus();
        }

        const quill = new Quill(this.editor.current as Element,{
            modules: {
                markdownShortcuts: {},
                toolbar: {
                    container: '#toolbar',
                }
            },
            placeholder:'Tell your story...',
        });

        this.quill = quill;
         // handle blur and foucs
        quill.on('selection-change', (range, oldRange, source) => {
          if (range === null && oldRange !== null) {
            this.setState({
                editorFocus: false,
            })
          }
          if (range !== null && oldRange === null) {
            this.setState({
                editorFocus: true,
            })
          }
      });
  };
    // blocks [Enter] key
  handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  public render() {
    return (
      <FullPageEditorWrapper>
        <Toolbar visible={this.state.editorFocus} />
        <TitleTextarea
          placeholder="Title"
          onKeyDown={this.handleTitleKeyDown}
          inputRef={ref => {
            this.titleTextarea = ref;
          }}
        />
        <div id="#toolbar" />
        <Editor>
          <div ref={this.editor} />
        </Editor>
      </FullPageEditorWrapper>
    );
  }
}
