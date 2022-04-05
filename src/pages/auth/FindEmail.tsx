import React, { Component } from 'react';
import styled from 'styled-components';
import { AuthDynamicModal, AuthPageTemplate } from '../../components/auth';
import {
  Division,
  PageSwitch,
  SubmitButton,
  TelInput,
} from '../../components/common';

export class FindEmail extends Component {
  render() {
    return (
      <AuthPageTemplate>
        <AuthDynamicModal headerTitle="이메일·비밀번호 찾기">
          <PageSwitch />
          <TelInput />
          <Division />
          <ResultBox>
            <p>고객님의 가입계정 목록입니다</p>
            <strong>Abcd@naver.com</strong>
          </ResultBox>
          <SubmitButton>확인</SubmitButton>
        </AuthDynamicModal>
      </AuthPageTemplate>
    );
  }
}

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  padding: 10px 0;
`;

export default FindEmail;
