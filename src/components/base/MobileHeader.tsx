import React from "react";
import MobileLogo from "../../static/images/logo-header.png";
import { ReactComponent as LocationIcon } from "../../static/icons/icon-pin.svg";
import { ReactComponent as SunnyIcon } from "../../static/icons/icon-weather-sunny.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useObserver } from "mobx-react";
import { useRecoilState, useRecoilValue } from 'recoil';
import AppState from '../../recoil/app';

const MobileHeaderBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  color: #fff;
`;

const FlexBox = styled.div<{ align?: string }>`
  flex: 1;
  align-items: center;
  text-align: ${({ align }) => (align ? align : "left")};

  p {
    font-size: 14px;
  }
`;

const MainSpace = styled.div`
display: inline-flex;
align-items: center;
gap: 5px;
`;

const Space = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
`;

export const Location = () => {
  // const { etc } = useStore();
  const { location } = useRecoilValue(AppState);

  return /* useObserver(() => */ (
    <MainSpace>
      <LocationIcon />
      <p style={{ fontSize: 12 }}>{location}</p>
    </MainSpace>
  )/* ) */;
};

export const Weather = () => {
  const { particulate_matter } = useRecoilValue(AppState);
  // const { etc } = useStore();

  return (
    <Space>
      <SunnyIcon />
      {<p style={{ fontSize: 10 }}>{particulate_matter[0]}</p>}
    </Space>
  );
};

const MobileHeader = () => {
  const navigate = useNavigate();

  return (
    <MobileHeaderBox>
      <div style={{ width: '20%' }}>
        <img
          src={MobileLogo}
          alt="logo-greenon"
          style={{ display: "block", cursor: "pointer" }}
          width={80}
          onClick={() => navigate("/")}
        />
      </div>
      <FlexBox align="center">
        <Location />
      </FlexBox>
      <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
        <Weather />
      </div>
    </MobileHeaderBox>
  );
};

export default MobileHeader;
