import React from "react";
import styled from "styled-components";

import { ReactComponent as AirPuriIcon } from "../../static/icons/icon-airpuri.svg";

const RowBox = styled.div`
margin: 10px 1px 36px 0;
padding: 12px 15px 12px 15px;
border-radius: 10px;
box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
background-color: white;
display: flex;
align-items: center;
justify-content: space-between;
`;

const ColBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h5`
  color: #1e2225;
  margin-bottom: 5px;

  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

interface Props {
  title: string;
  name: string;
  type: string;
  serial: string;
};

const DeviceInfo = ({ title, name, type, serial }: Props) => {
  return (
    <RowBox style={{ justifyContent: "space-between" }}>
      <div>
        <Title>{`${type} ${name}`}</Title>
        <div>
          <small style={{ color: "#ff5858", marginBottom: 5, fontSize: 14 }}>{serial}</small>
        </div>
        <div>
          <small style={{ color: "#007ba8" }}>{type}</small>
        </div>
      </div>
      <AirPuriIcon />
    </RowBox>
  );
};

export default DeviceInfo;
