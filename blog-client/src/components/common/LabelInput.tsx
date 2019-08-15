import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const LabelInputBlock = styled.div<{ focus: boolean }>`
    label,
    input {
        display: block;
        line-height: 1.5;
    }
    label {
        font-weight: bold;
        font-size: 1.125rem;
        color: ${palette.gray9};
        margin-bottom: 1rem;
        transition: all 0.125s ease-in;
        ${props =>
        props.focus &&
        css`
            color: ${palette.teal7};
        `}
    }
    input {
        font-size: 1.5rem;
        border: none;
        outline: none;
        border-bottom: 1px solid ${palette.gray6};
        padding-bottom: 0.5rem;
        width: 100%;
        color: ${palette.gray7};
        ${props =>
        props.focus &&
            css`
                color: ${palette.teal7};
                border-bottom: 1px solid ${palette.teal7};
            `}
    }
    .group {
        display: inline-block;
        max-width: 100%;
    }
    .width-maker {
        max-width: 100%;
        display: inline-block;
        font-size: 1.5rem;
        visibility:hidden;
        overflow: hidden;
        line-height:0;

    }
`;
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface LabelInputProps extends InputProps{
    label: string;
    placeholder: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler
}
const { useEffect, useState, useCallback } = React;
const LabelInput: React.SFC<LabelInputProps> = ({ 
    label, 
    name, 
    value,
    placeholder, 
    onChange,
    ...rest
}) => {
    const [focus, setFocus] = useState(false);
    const onFocus = useCallback(() => {
        setFocus(true);
    },[])
    const onBlur = useCallback(() => {
        setFocus(false);
    },[])
    useEffect(() => {
    }, [value, placeholder]);
    return (
        <LabelInputBlock focus={focus}>
            <label>{label}</label>
            <div className="group">
                <input 
                    name={name} 
                    onChange={onChange} 
                    value={value} 
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                />
                <div className="width-maker">{value || placeholder}</div>
            </div>
        </LabelInputBlock>
  );
};

export default LabelInput;