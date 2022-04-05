import React from 'react';
import styled from 'styled-components';

import CheckIcon from '../../static/icons/icon-check.png';

interface CheckInputProps {
  id: string;
  title: string;
  onChange?: any;
}

const CheckInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  background-color: #e5f2f8;
`;

const CheckBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #b1cad6;
  cursor: pointer;

  input {
    display: none;
  }

  label {
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  label:after {
    content: '';
    width: 100%;
    height: 100%;
  }

  input:checked + label {
    background: url(${CheckIcon}) no-repeat center center / cover;
  }
`;

const CheckInput = ({ id, title, onChange }: CheckInputProps) => {
  return (
    <CheckInputBox>
      <p style={{ fontSize: 14 }}>{title}</p>
      <CheckBox>
        <input id={id} type="checkbox" onChange={onChange} />
        <label htmlFor={id} />
      </CheckBox>
    </CheckInputBox>
  );
};

export default CheckInput;
