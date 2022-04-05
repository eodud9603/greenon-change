import React from 'react';
import styled from 'styled-components';

interface InputTemplateProps {
  label?: string;
}

const InputTemplateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 14px;
`;

const InputTemplate: React.FC<InputTemplateProps> = ({ label, children }) => {
  return (
    <InputTemplateBox>
      {label && <InputLabel>{label}</InputLabel>}
      {children}
    </InputTemplateBox>
  );
};

export default InputTemplate;
