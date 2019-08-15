import * as React from 'react';
import styled from 'styled-components';

const LabelInputBlock = styled.div`
    label {

    }
    input {

    }
`;
interface LabelInputProps{
    label: string;
    name?: string;
    value: string;
    onChange?: React.ChangeEventHandler
}

const LabelInput: React.SFC<LabelInputProps> = ({ label, name, value, onChange }) => {

    return (
        <LabelInputBlock>
            <label>{label}</label>
            <input name={name} change={onChange} value={value} />
        </LabelInputBlock>
  );
};

export default LabelInput;