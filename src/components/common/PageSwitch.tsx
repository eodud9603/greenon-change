import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageSwitch = () => {
  const path = window.location.pathname;

  return (
    <Container>
      <Switch to="/find_email" active={path === '/find_email'}>
        이메일 찾기
      </Switch>
      <Switch to="/find_password" active={path === '/find_password'}>
        비밀번호 찾기
      </Switch>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #e5f2f8;
  border-radius: 5px;
  gap: 10px;
`;

const Switch = styled(Link)<{ active: Boolean }>`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(props) => (props.active ? '#007cba' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#007cba')};
`;

export default PageSwitch;
