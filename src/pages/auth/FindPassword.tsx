import React, { Component } from 'react';
import { AuthPageTemplate, AuthDynamicModal } from '../../components/auth';
import {
  Division,
  PageSwitch,
  SubmitButton,
  TelInput,
  TextInput,
} from '../../components/common';

export class FindPassword extends Component {
  render() {
    return (
      <AuthPageTemplate>
        <AuthDynamicModal headerTitle="이메일·비밀번호 찾기">
          <PageSwitch />
          <TextInput type="email" label="이메일" />
          <TelInput />
          <Division />
          <TextInput type="password" label="새 비밀번호 입력" />
          <TextInput type="password" label="새 비밀번호 확인" />
          <SubmitButton>확인</SubmitButton>
        </AuthDynamicModal>
      </AuthPageTemplate>
    );
  }
}

export default FindPassword;
