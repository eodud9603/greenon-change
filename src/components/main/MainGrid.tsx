import React from "react";
import styled from "styled-components";
import { DeviceType } from "../../recoil/device";
// import { IDevice } from "../../stores/device";
import { DeviceCard } from "../device";

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(335px, 1fr));
`;

const MainGrid = ({ data }: { data: DeviceType[] }) => {
  return (
    <Grid>
      {data.map((dat: DeviceType) => <DeviceCard device={dat} key={dat.id} />)}
    </Grid>
  );
};

export default MainGrid;
