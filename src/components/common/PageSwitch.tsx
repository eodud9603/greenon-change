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
  border: solid 1px #778d98;
  border-radius: 10px;
  /* gap: 10px; */
  margin-bottom: 20px;
`;

const Switch = styled(Link)<{ active: Boolean }>`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => (props.active ? '#e5f2f8' : 'transparent')};
  color: ${(props) => (props.active ? '#1ca5c7' : '#b1cad6')};
`;

export default PageSwitch;
