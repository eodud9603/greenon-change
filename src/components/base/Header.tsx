import { useObserver } from "mobx-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DeviceState from "../../recoil/device";

import Logo from "../../static/images/logo-login.png";

import { useRecoilValue } from 'recoil';
// import useStore from "../../stores";

const Box = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
`;

const Space = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.img`
  display: block;
  height: 30px;
`;

const HeaderMenuList = styled.ul`
  display: flex;
  align-items: center;
  /* gap: 40px; */
`;

const HeaderMenuItem = styled(Link)`
  margin-right: 40px;
`;

const Connection = () => {
  const deviceList = useRecoilValue(DeviceState);

  return (
    <Space>
      <strong>{deviceList.length}</strong>
      <p style={{ marginLeft: 5 }}>연결됨</p>
    </Space>
  );
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Space>
        <HeaderLogo
          src={Logo}
          alt="logo-greenon"
          style={{ cursor: "pointer", marginRight: 40 }}
          onClick={() => navigate("/")}
        />
        <HeaderMenuList>
          <HeaderMenuItem to="/">장치 리스트</HeaderMenuItem>
          <HeaderMenuItem to="/manage">장치 제어</HeaderMenuItem>
          <HeaderMenuItem to="/mypage">마이페이지</HeaderMenuItem>
        </HeaderMenuList>
      </Space>
      <Connection />
    </Box>
  );
};

export default Header;
