import * as React from 'react';
import styled from 'styled-components';
import Quill, { RangeStatic } from 'quill';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import 'quill/dist/quill.snow.css';
import TextareaAutosize from 'react-textarea-autosize';
import MarkdownShortcuts from '../../lib/quill/markdownShortcuts';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';
import AddLink from './AddLink';
import postStyles from '../../lib/styles/postStyles';

console.log((window as any).hljs);

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
export interface FullPageEditorProps {}
export interface FullPageEditorState {
    titleFocus: boolean;
    editorFocus: boolean;
    addLink: boolean;
    addLinkPosition: {
        left: number;
        top: number;
    };
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
        ${postStyles}
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
        titleFocus: false,
        editorFocus: false,
        addLink: false,
        addLinkPosition: {
          top: 0,
          left: 0,
        },
    }
    componentDidMount() {
        if (!(window as any).HLJS_CONFIGURED) {
            (window as any).HLJS_CONFIGURED = true;
            hljs.configure({
              languages: ['javascript', 'python'],
            });
          }
            // set focus to title
        if (this.titleTextarea) {
            this.titleTextarea.focus();
        }

      // keyboard bindings
      const bindings = {
        removeCodeBlock: {
          key: 'backspace',
          empty: true,
          format: ['code-block'],
          handler: (range: RangeStatic, context: any) => {
            quill.format('code-block', false);
          },
        },
      };

        const quill = new Quill(this.editor.current as Element,{
            modules: {
                keyboard: {
                  bindings,
                },
                markdownShortcuts: {},
                toolbar: {
                    container: '#toolbar',
                    handlers: {
                      link: (value: string) => {
                        const range = quill.getSelection();
                        if (!range) return;
                        const bounds = quill.getBounds(range.index);
                        this.setState({
                          addLink: true,
                          addLinkPosition: {
                            left: bounds.left,
                            top: bounds.top + bounds.height,
                          },
                        });
                      },
                    },
                  },
                  syntax: {
                    interval: 200,
                  },
            },
            placeholder:'Tell your story...',
        });

        this.quill = quill;
        (window as any).quill = quill;
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

        const getIndent = (text: string) => text.length - text.trimLeft().length;

        const onEnter = () => {
          // handle keep-indent
          const text = quill.getText();
          const selection = quill.getSelection();
          if (!selection) return;
          const lastLineBreakIndex = text.lastIndexOf('\n', selection.index - 1);
          const lastLine = text.substr(
            lastLineBreakIndex + 1,
            selection.index - lastLineBreakIndex - 1,
          );
          const format = quill.getFormat(
            lastLineBreakIndex + 1,
            selection.index - lastLineBreakIndex - 1,
          );
    
          // indent
          if (format['code-block']) {
            console.log(`"${lastLine}"`);
            let indentation = getIndent(lastLine);
            console.log(indentation);
            const shouldExtraIndent = (() => {
              return /\)\:$/.test(lastLine) || /\)? ?{$/.test(lastLine);
            })();
            console.log(shouldExtraIndent)
            if (shouldExtraIndent) {
              indentation += 2;
            }
            if (indentation === 0) return;
            const spaces = ' '.repeat(indentation);
            if (lastLine === '\n') return;
            console.log(lastLine);
            quill.insertText(selection.index + 1, spaces);
            setTimeout(() => {
              quill.setSelection(selection.index + 1 + indentation, 0);
            });
          }
        };
    
        quill.on('text-change', (delta, oldContents, source) => {
          const lastOps = delta.ops[delta.ops.length - 1];
          if (lastOps) {
            if (lastOps.insert === '\n') {
              onEnter();
            }
          }
        });
  };
  
  
  handleTitleFocus = () => {
      this.setState({
          titleFocus: true
      })
  };
  handleTitleBlur = () => {
    this.setState({
      titleFocus: false,
    });
  };
    // blocks [Enter] key
  handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  handleAddLink = (value: string) => {
    if (!this.quill) return;
    this.quill.format('link', value);
    this.setState({
      addLink: false,
    });
  };

  handleCancelAddLink = () => {
    this.setState({ addLink: false });
  };

  public render() {
    const { addLink, addLinkPosition, titleFocus } = this.state;
    return (
      <FullPageEditorWrapper>
        <Toolbar visible={!titleFocus} />
        <TitleTextarea
          placeholder="Title"
          onKeyDown={this.handleTitleKeyDown}
          inputRef={ref => {
            this.titleTextarea = ref;
          }}
          onFocus={this.handleTitleFocus}
          onBlur={this.handleTitleBlur}
        />
        <div id="#toolbar" />
        <Editor>
          <div ref={this.editor} />
          {addLink && (
            <AddLink
              {...addLinkPosition}
              onConfirm={this.handleAddLink}
              onClose={this.handleCancelAddLink}
            />
          )}
        </Editor>
      </FullPageEditorWrapper>
    );
  }
}
