import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { DeviceStatusType } from "../../recoil/device";
import zoomPlugin from 'chartjs-plugin-zoom'
// import { IDeviceData } from "../../stores/device";

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

const width = window.innerWidth;

const ButtonGroup = styled.div`
  display: flex;
  //white-space: nowrap;
  overflow-x: scroll;
  
  &>* {
    margin-right: 5px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    &>* {margin-right: 10px; }
  }
`;

const Button = styled.button<{ active?: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 5px;
  background: ${({ active }) => (active ? "#007cba" : "#e5f2f8")};
  color: ${({ active }) => (active ? "#fff" : "#007cba")};
`;

const DeviceChart = ({ chartData }: { chartData: DeviceStatusType[] }) => {
  const [active, setActive] = useState("bio_air_roll");

  const handleClick = (e:any) => {
    setActive(e.target.name);
  };
  const sortedData = useMemo(() => {
    return chartData.sort(
      (a: DeviceStatusType, b: DeviceStatusType) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    );
  }, [chartData]);

  const data: any = useMemo(() => {
    return {
      labels: sortedData.map((data: DeviceStatusType) =>
        moment(data.createdAt).format("HH:mm")
      ),
      datasets: [
        {
          data: sortedData.map((data: any) => data[active]),
          borderColor: "#007ba8",
          backgroundColor: "#fff",
        },
      ],
      fill: false,
    };
  }, [sortedData, active]);

  return (
    <React.Fragment>
      <h5>누적데이터</h5>
      <ButtonGroup>
        <Button
          name="bio_aerosol"
          active={active === "bio_aerosol"}
          onClick={handleClick}
          // style={{ marginRight: 5 }}
        >
          바이오에어로졸지수
        </Button>
        <Button
          name="air_quality"
          active={active === "air_quality"}
          onClick={handleClick}
          // style={{ marginRight: 5 }}
        >
          공기질지수
        </Button>
        <Button
          name="food_poisoning"
          active={active === "food_poisoning"}
          onClick={handleClick}
          // style={{ marginRight: 5 }}
        >
          식중독지수
        </Button>
        <Button
          name="particulate_matter"
          active={active === "particulate_matter"}
          onClick={handleClick}
        >
          미세먼지지수(PM2.5)
        </Button>
        {/*<Button*/}
        {/*    name="hydrogen_sulfide"*/}
        {/*    active={active === "hydrogen_sulfide"}*/}
        {/*    onClick={handleClick}*/}
        {/*>*/}
        {/*  황화수소*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*    name="ammonia"*/}
        {/*    active={active === "ammonia"}*/}
        {/*    onClick={handleClick}*/}
        {/*>*/}
        {/*  암모니아*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*    name="voc"*/}
        {/*    active={active === "voc"}*/}
        {/*    onClick={handleClick}*/}
        {/*>*/}
        {/*  VOC*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*    name="co2"*/}
        {/*    active={active === "co2"}*/}
        {/*    onClick={handleClick}*/}
        {/*>*/}
        {/*  CO2*/}
        {/*</Button>*/}
      </ButtonGroup>
      <Line data={data} options={{
        // scales: {
        //   y: {
        //     min: 0,
        //     max: active === 'air_quality' ? 500 : 100,
        //   },
        // },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed:0.5
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
            pan: {
              enabled: true,
              mode: 'xy',
            },
            limits: {
              y: {min: 0, max: 100},
            },
          }
        }
      }}/>
    </React.Fragment>
  );
};

export default React.memo(DeviceChart);
