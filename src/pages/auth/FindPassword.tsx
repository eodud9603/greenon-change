import React, { Component, useEffect, useRef, useState } from 'react';
import { AuthPageTemplate, AuthDynamicModal } from '../../components/auth';

import {
  Division,
  PageSwitch,
  SubmitButton,
  TelInput,
  TextInput,
  Input,
  Button
} from '../../components/common';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { apis } from '../../lib/axios';
import ToastState from '../../recoil/toast';
import CryptoJS from 'crypto-js';

const FormHeader = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;

  label {
    font-size: 14px;
    margin-right: 10px;
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
const VerifyText = styled.div`
  color: red;
  font-size: 14px;
`;

const FindPassword = () => {
  const setToast = useSetRecoilState(ToastState);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    password2: '',
    phone: ''
  });
  const [codeEnabled, setCodeEnabled] = useState(false);
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    phone: null
  });
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!inputs.email.length) return setToast({ open: true, message: '이메일을 입력해주세요.', type: 'error' });
    if (!inputs.password.length) return setToast({ open: true, message: '비밀번호를 입력해주세요.', type: 'error' });
    if (inputs.password !== inputs.password2) return setToast({ open: true, message: '비밀번호가 일치하지 않습니다.', type: 'error' });
    if (!verified) return setToast({ open: true, message: '휴대폰 인증을 완료해주세요.', type: 'error' });

    let hashedPassword = inputs.password;
    for (let i = 0; i < 50; i++) {
      hashedPassword = CryptoJS.SHA512(hashedPassword + process.env.REACT_APP_HASH_SALT).toString();
    }

    apis.changePassword(inputs.email, hashedPassword).then(res => {
      if (res.status === 201 && res.data.isSuccess && res.data.affected !== 0) {
        setToast({ open: true, message: '비밀번호가 변경되었습니다.', type: 'success' });
        navigate('/login');
      } else {
        setToast({ open: true, message: '해당 계정이 존재하지 않습니다.', type: 'error' });
      }
    });

    // apis
    //   .register(inputs.email, hashedPassword, inputs.phone)
    //   .then(async (res) => {
    //     if (res.status === 201) {
    //       setToast({ open: true, message: '가입 완료되었습니다.', type: 'success' });
    //       navigate("/login");
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response.data.error === "Already Exist") {
    //       setErrors((prev) => ({
    //         ...prev,
    //         email: "이미 해당 이메일로 가입된 계정이 있습니다.",
    //       }));
    //     }
    //     // console.error(err);
    //   });
  };

  const onClickSendCode = () => {
    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!inputs.phone.match(regPhone)) {
      return setErrors({ ...errors, phone: '휴대폰 번호를 정확히 입력해주세요.' });
    }
    setErrors({ ...errors, phone: null });

    apis.sendVerifyCode(inputs.phone).then(res => {
      if (res.status === 201) {
        setCodeEnabled(true);
        
        let time = 3 * 60 - 1;
        renderTime(time);
        
        intervalRef.current = setInterval(() => {
          time -= 1;
          renderTime(time);
          if (time === 0) {
            setCodeEnabled(false);
            clearInterval(intervalRef.current);
          }
        }, 1000);
      } else setToast({ open: true, message: '인증코드 발송 실패', type: 'error' });
    });
  }

  const onClickVerifyCode = () => {
    apis.verifyCode(inputs.phone, code).then(res => {
      if (res.status === 201 && res.data.affected === 1) {
        setVerified(true);
        setToast({ open: true, message: '인증되었습니다.', type: 'success' });
        clearInterval(intervalRef.current);
      }
    });
  }

  const renderTime = (time:number) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    document.querySelector('span.timer-text').textContent = `인증번호 만료까지 ${m}:${('0'+s).slice(-2)}`;
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  return (
    <AuthPageTemplate>
      <AuthDynamicModal headerTitle="이메일·비밀번호 찾기">
        <PageSwitch />
        <TextInput type="email" label="이메일" value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} />
        {/* <TelInput /> */}
        <FormHeader>
          <label>휴대폰 인증</label>
          <small>이메일 조회를 위한 전화번호 인증이 필요합니다.</small>
        </FormHeader>
        <InputWrapper>
          <Input
            type="tel"
            style={{ flex: 2, marginRight: 10 }}
            value={inputs.phone}
            onChange={e => setInputs({ ...inputs, phone: e.target.value })}
            disabled={codeEnabled || verified}
          />
          <RightButton
            onClick={onClickSendCode}
            disabled={codeEnabled || !inputs.phone.length || verified}
          >인증번호 전송</RightButton>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="tel"
            style={{ flex: 2, marginRight: 10 }}
            value={code}
            onChange={e => setCode(e.target.value)}
            disabled={!codeEnabled || verified}
          />
          <RightButton
            onClick={onClickVerifyCode}
            disabled={!codeEnabled || verified}
          >인증</RightButton>
        </InputWrapper>
        {errors.phone && <VerifyText>{errors.phone}</VerifyText>}
        {codeEnabled && !verified && <VerifyText>인증번호 만료까지 <span className="timer-text"></span></VerifyText>}
        <Division />
        <TextInput type="password" label="새 비밀번호 입력" value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} />
        <TextInput type="password" label="새 비밀번호 확인" value={inputs.password2} onChange={e => setInputs({ ...inputs, password2: e.target.value })} />
        <SubmitButton onClick={onSubmit}>확인</SubmitButton>
      </AuthDynamicModal>
    </AuthPageTemplate>
  );
}

export default FindPassword;
