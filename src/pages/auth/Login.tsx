import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthPageTemplate } from "../../components/auth";
import { Button, TextInput } from "../../components/common";
import { apis } from "../../lib/axios";
import Logo from "../../static/images/logo-login.png";
import CryptoJS from 'crypto-js';
import { useSetRecoilState } from 'recoil';
import UserState from "../../recoil/user";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { ReactComponent as KakaoLogin } from "../../static/icons/kakao.svg";
import { ReactComponent as GoogleLogin } from "../../static/icons/google.svg";

interface InputProps {
  email: string;
  password: string;
}

const ErrorMessage = styled.p<{ show?: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  color: #eeff00;
  font-size: 12px;
`;

const Login = () => {
  const { onClickLogin:onClickKakaoLogin } = useKakaoLogin({ baseUri: window.location.origin });
  const setUserState = useSetRecoilState(UserState);
  let [input, setInput] = React.useState<InputProps>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const login = async (e:any) => {
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      let hashedPassword = input.password;
      for (let i = 0; i < 50; i++) {
        hashedPassword = CryptoJS.SHA512(hashedPassword + process.env.REACT_APP_HASH_SALT).toString();
      }

      apis.login(input.email, hashedPassword)
      .then(async ({ data }) => {
        if (data.user) {
          setUserState({
            id: data.user.id,
            isAdmin: data.isAdmin,
            email: input.email,
            name: data.user.name || '',
            phone: data.user.phone || ''
          });
          navigate("/", { replace: true });
        } else {
          setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
      })
      .catch((err) => setErrorMessage(err.response.data.error));
    } else {
      setErrorMessage("이메일 또는 비밀번호를 입력해주세요");
    }
  }

  function onChangeInput(e: any) {
    const { type, value } = e.target;
    setInput((prev) => ({ ...prev, [type]: value }));
  }

  return (
    <AuthPageTemplate>
      <Container>
        <img
          src={Logo}
          alt="greenon"
          style={{ marginBottom: 50, width: 150 }}
        />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: '100%',
            maxWidth: 500,
          }}>
          <TextInput
            type="email"
            placeholder="이메일"
            onChange={onChangeInput}
            value={input.email}
          />
          <TextInput
            type="password"
            placeholder="비밀번호"
            onChange={onChangeInput}
            value={input.password}
          />
          <ErrorMessage show={errorMessage !== ""}>
            {errorMessage}
          </ErrorMessage>
          <div style={{ marginTop: 30 }}>
            <Button onClick={login}>로그인</Button>
          </div>
        </form>
      </Container>
    </AuthPageTemplate>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 100px; */
  padding: 0px 20px 20px 20px;

  @media (min-width: 540px) {
    padding: 0;
  }
`;

const Modal = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-radius: 20px;
  padding: 20px;

  @media (min-width: 540px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-top: 60px;
    padding-bottom: 100px;
  }
`;

const ModalInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 540px) {
    width: 295px;
    margin: 0 auto;
  }
`;

const HorizontalBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: #007cba;
`;

export default Login;
