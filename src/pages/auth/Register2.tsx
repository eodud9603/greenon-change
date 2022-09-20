import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { AuthPageTemplate, AuthDynamicModal } from "../../components/auth";
import { TextInput, SubmitButton, TelInput, Button, Input } from "../../components/common";
import { apis } from "../../lib/axios";
import ToastState from "../../recoil/toast";
import CryptoJS from 'crypto-js';
import styled from "styled-components";

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
  background: #1ca5c7;
  font-size: 14px;
  color: white;
`;
const VerifyText = styled.div`
  color: red;
  font-size: 14px;
`;

const Register2 = () => {
  const setToast = useSetRecoilState(ToastState);
  const [inputs, setInputs] = useState({
    id: '',
    email: '',
    password: '',
    password2: '',
    name: '',
    phone: '',
    telephone: '',
  });
  const [codeEnabled, setCodeEnabled] = useState(false);
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({
    id: null,
    email: null,
    password: null,
    name: null,
    phone: null,
    telephone: null,
  });
  let navigate = useNavigate();
  const intervalRef = useRef(null);

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!inputs.id.length) return setToast({ open: true, message: '아이디를 입력해주세요.', type: 'error' });
    if (!inputs.email.length) return setToast({ open: true, message: '이메일을 입력해주세요.', type: 'error' });
    if (!inputs.password.length) return setToast({ open: true, message: '비밀번호를 입력해주세요.', type: 'error' });
    if (inputs.password !== inputs.password2) return setToast({ open: true, message: '비밀번호가 일치하지 않습니다.', type: 'error' });
    if (!inputs.name.length) return setToast({ open: true, message: '이름을 입력해주세요.', type: 'error' });
    if (!verified) return setToast({ open: true, message: '휴대폰 인증을 완료해주세요.', type: 'error' });

    let hashedPassword = inputs.password;
    for (let i = 0; i < 50; i++) {
      hashedPassword = CryptoJS.SHA512(hashedPassword + process.env.REACT_APP_HASH_SALT).toString();
    }

    apis
      .register(inputs.email, hashedPassword, inputs.phone)
      .then(async (res) => {
        if (res.status === 201) {
          setToast({ open: true, message: '가입 완료되었습니다.', type: 'success' });
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response.data.error === "Already Exist") {
          setErrors((prev) => ({
            ...prev,
            email: "이미 해당 이메일로 가입된 계정이 있습니다.",
          }));
        }
        // console.error(err);
      });
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
      <AuthDynamicModal headerTitle="회원가입">
        <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextInput
            name="id"
            type="text"
            label="아이디"
            placeholder="6자 이상 입력해주세요"
            onChange={onChangeInput}
            error={errors.id}
          />
          <TextInput
            name="password"
            type="password"
            placeholder="8~16자, 영문+숫자+특수문자 조합"
            label="패스워드"
            onChange={onChangeInput}
          />
          <TextInput
            name="password2"
            type="password"
            label="패스워드 확인"
            placeholder="8~16자, 영문+숫자+특수문자 조합"
            onChange={onChangeInput}
            error={
              inputs.password !== inputs.password2
                ? "비밀번호가 일치하지 않습니다."
                : null
            }
          />
          {/* TODO: 이름 연동 */}
          <TextInput
            name="name"
            type="text"
            label="이름"
            placeholder="이름을 입력해주세요"
            onChange={onChangeInput}
            error={errors.name}
          />
          <TextInput
            name="email"
            type="email"
            label="이메일"
            placeholder="ex) green365@greenon.co.kr"
            onChange={onChangeInput}
            error={errors.email}
          />
          <Form id="tel-form" style={{ marginBottom: 20 }} onSubmit={e => e.preventDefault()}>
            <FormHeader>
              <label>휴대폰 인증</label>
              <small>이메일 조회를 위한 전화번호 인증이 필요합니다.</small>
            </FormHeader>
            <InputWrapper>
              <Input
                type="tel"
                style={{ flex: 2, marginRight: 10, backgroundColor: '#28555f', border: 'none' }}
                value={inputs.phone}
                placeholder='휴대폰 번호를 입력해주세요'
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
                style={{ flex: 2, marginRight: 10, backgroundColor: '#28555f', border: 'none' }}
                value={code}
                placeholder='인증번호 입력'
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
          </Form> {/* TODO: 전화번호 연동 */}
          <TextInput
            name="telephone"
            type="tel"
            placeholder="ex) 02-360-2200"
            label="전화번호 (선택)"
            onChange={onChangeInput}
            error={errors.telephone}
          />
          <SubmitButton
            // disabled={
            //   !(
            //     Object.values(inputs).every((val) => val) &&
            //     inputs.password === inputs.password2
            //   )
            // }
            onClick={onSubmit}
            style={{ backgroundColor: '#1ca5c7' }}
          >
            다음
          </SubmitButton>
        </form>
      </AuthDynamicModal>
    </AuthPageTemplate>
  );
};

export default Register2;
