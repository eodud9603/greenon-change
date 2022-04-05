import React from "react";
import { InputTemplate } from ".";

interface TextAreaInputProps {
  name?: string;
  label: string;
  value: string;
  onChange?: any;
}

const TextArea = ({ label, name, value, onChange }: TextAreaInputProps) => {
  return (
    <InputTemplate label={label}>
      <textarea
        style={{
          flex: 1,
          border: "1px solid #b1cad6",
          resize: "none",
          borderRadius: 10,
          padding: 15,
        }}
        rows={5}
        name={name}
        value={value}
        onChange={onChange}
      />
    </InputTemplate>
  );
};

export default TextArea;
