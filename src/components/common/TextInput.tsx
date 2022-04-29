import React from "react";
import styled from "styled-components";
import { InputTemplate } from ".";

interface TextInputProps {
  name?: string;
  type: string;
  label: string;
  background?: string;
  right?: React.ReactNode;
  onChange?: (e: any) => void;
  value?: any;
  error?: string;
  disabled?: boolean;
  defaultValue?: string | number | readonly string[]
}

const InputBox = styled.div<{ background?: string }>`
  border-radius: 6px;
  border: ${({ background }) => (background ? "none" : "1px solid #b1cad6")};
  background: ${({ background }) => (background ? background : "#fff")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 15px;
  height: 100%;
  width: 100%;
  font-size: 16px;

  &:focus-visible {
    outline: none;
  }
`;

const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  label,
  background,
  right,
  onChange,
  value,
  error,
  disabled = false,
  defaultValue
}) => {
  return (
    <InputTemplate label={label}>
      <InputBox background={background}>
        <Input defaultValue={defaultValue} disabled={disabled} name={name} type={type} onChange={onChange} value={value} autoComplete="off" />
        {right}
      </InputBox>
      <div style={{ fontSize: 14, color: "red" }}>{error}</div>
    </InputTemplate>
  );
};

export default TextInput;
