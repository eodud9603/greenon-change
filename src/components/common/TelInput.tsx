import React from "react";
import styled from "styled-components";
import { Input, Button } from ".";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;

  label {
    font-size: 14px;
  }

  small {
    font-size: 12px;
    color: #8b8b8b;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const RightButton = styled(Button)`
  flex: 1;
  background: #e5f2f8;
  font-size: 14px;
  color: #007cba;
`;

const TelInput = () => {
  return (
    <Form id="tel-form" style={{ marginBottom: 20 }}>
      <FormHeader>
        <label>휴대폰 인증</label>
        <small>이메일 조회를 위한 전화번호 인증이 필요합니다.</small>
      </FormHeader>
      <InputWrapper>
        <Input type="tel" style={{ flex: 2, marginRight: 10 }} />
        <RightButton>인증번호 전송</RightButton>
      </InputWrapper>
      <InputWrapper>
        <Input type="tel" style={{ flex: 2, marginRight: 10 }} />
        <RightButton>인증</RightButton>
      </InputWrapper>
    </Form>
  );
};

export default TelInput;
