import React, { Component, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { AuthDynamicModal, AuthPageTemplate } from '../../components/auth';
import {
  Button,
  Division,
  Input,
  PageSwitch,
  SubmitButton,
  TelInput,
} from '../../components/common';
import { apis } from '../../lib/axios';
import ToastState from '../../recoil/toast';

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

const FindEmail = () => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
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
  const [result, setResult] = useState<string[]>();

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
        
        apis.findEmail(inputs.phone).then(res => {
          if (res.status === 201) {
            setResult(res.data);
          }
        })
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

        {result !== undefined && (<>
          <Division />
          <ResultBox>
            {result.length ? <>
              <p>고객님의 가입계정 목록입니다</p>
              {result.map(r => <strong>{r}</strong>)}
            </> : 
              <p>가입된 계정이 없습니다!<br/>다시 한 번 확인해주세요</p>
            }
          </ResultBox>
          <SubmitButton onClick={() => navigate('/login')}>확인</SubmitButton>
        </>)
        }
      </AuthDynamicModal>
    </AuthPageTemplate>
  );
}

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  padding: 10px 0;
`;

export default FindEmail;
