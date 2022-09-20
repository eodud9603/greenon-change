import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthPageTemplate, AuthDynamicModal } from "../../components/auth";
import { ColoredButton } from "../../components/common";
import CheckIcon from "../../static/icons/icon-check.png";

const TextLink = styled(Link)`
  font-size: 16px;
`;

const Register: React.FC = () => {
  const [checkInputs, setCheckInputs] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  let navigate = useNavigate();

  const onClick = (e:any) => {
    const targetId: "check1" | "check2" | "check3" | "check4" = e.target.id;

    setCheckInputs((prev) => ({
      ...prev,
      [targetId]: !prev[targetId],
    }));
  }

  const onSubmit = () => {
    if (Object.values(checkInputs).every((val) => val)) {
      navigate("/register2");
    }
    return false;
  }

  return (
    <AuthPageTemplate>
      <AuthDynamicModal headerTitle="약관 동의">
        <h3 style={{ fontSize: 16, fontWeight: 500, textAlign: "center", color: 'white' }}>
          서비스 이용을 위한 약관에 동의해주시기 바립니다.
        </h3>
        <FormWrapper style={{ marginBottom: 20 }}>
          <TextLink to="/register/agree1/terms1">그린온 이용약관 동의</TextLink>
          <CheckInput>
            <input
              id="check1"
              type="checkbox"
              checked={checkInputs.check1}
              onChange={onClick}
            />
            <label htmlFor="check1" style={{ cursor: 'pointer' }} />
          </CheckInput>
        </FormWrapper>
        <FormWrapper style={{ marginBottom: 20 }}>
          <TextLink to="/register/agree1/terms2">개인정보 수집이용 동의</TextLink>
          <CheckInput>
            <input
              id="check2"
              type="checkbox"
              checked={checkInputs.check2}
              onChange={onClick}
            />
            <label htmlFor="check2" style={{ cursor: 'pointer' }} />
          </CheckInput>
        </FormWrapper>
        <FormWrapper style={{ marginBottom: 20 }}>
          <TextLink to="/register/agree1/terms3">만 14세 이상 고객 확인</TextLink>
          <CheckInput>
            <input
              id="check3"
              type="checkbox"
              checked={checkInputs.check3}
              onChange={onClick}
            />
            <label htmlFor="check3" style={{ cursor: 'pointer' }} />
          </CheckInput>
        </FormWrapper>
        <FormWrapper style={{ marginBottom: 20 }}>
          <TextLink to="/register/agree1/terms4">마케팅 활용 동의</TextLink>
          <CheckInput>
            <input
              id="check4"
              type="checkbox"
              checked={checkInputs.check4}
              onChange={onClick}
            />
            <label htmlFor="check4" style={{ cursor: 'pointer' }} />
          </CheckInput>
        </FormWrapper>
        <ColoredButton
          onClick={onSubmit}
          disabled={!Object.values(checkInputs).every((val) => val)}
          style={{ backgroundColor: '#1ca5c7' }}
        >
          다음
        </ColoredButton>
      </AuthDynamicModal>
    </AuthPageTemplate>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-radius: 10px;
  background-color: #28555f;
  color: #778d98;
`;

const CheckInput = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #fff;
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
    content: "";
    width: 100%;
    height: 100%;
  }

  input:checked + label {
    background: url(${CheckIcon}) no-repeat center center / cover;
  }
`;

export default Register;
