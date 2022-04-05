import React from "react";
import styled from "styled-components";
import { ManageCard } from ".";
import { DeviceType } from "../../recoil/device";
// import { IDevice } from "../../stores/device";

const ManageGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(335px, 1fr));
  grid-gap: 20px;

  @media (min-width: 730px) {
    grid-template-columns: repeat(auto-fit, minmax(335px, 0.5fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(335px, 0.5fr));
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(auto-fit, minmax(335px, 0.25fr));
  }
`;

const ManageGrid = ({ data }: { data: DeviceType[] }) => {
  return (
    <ManageGridBox>
      {data &&
        data.map((device: DeviceType) => (
          <ManageCard data={device} key={device.id} />
        ))}
    </ManageGridBox>
  );
};

export default ManageGrid;
