import React, {useEffect, useMemo, useState} from "react";
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
import {apis} from "../../lib/axios";
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
  width: calc(100vw - 40px);
  
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

const DeviceChart = ({ id }: { id:string }) => {
  const [active, setActive] = useState({sensor: "bio_air_roll",date:'day'});
  const [chartData,setChartData] = useState([]);

  const handleClick = (e:any) => {
    setActive({
      ...active,
      sensor: e.target.name
    });
  };
  const handleDateClick = (e:any) => {
    setActive({
      ...active,
      date: e.target.name
    });
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
        moment(data.createdAt).format(active.date === 'day' ? "HH:mm" : "MM-DD")
      ),
      datasets: [
        {
          data: sortedData.map((data: any) => data[active.sensor]),
          borderColor: "#007ba8",
          backgroundColor: "#fff",
        },
      ],
      fill: false,
    };
    console.log('sortDate1 :: ',sortedData )
  }, [sortedData, active.sensor,active.date]);

  useEffect(() => {
    if (id) {
      // apis.getDeviceStatus(id, user.id).then(({ data }) => {
      //     console.log('status :: ',data)
      //   setStatus(data.filter(d => d.id === id)[0].status);
      // })
      apis.getCumulativeData(id,active.date).then(({ data }) => {
        console.log('status :: ',data)
        setChartData(data);
      })
    }
  }, [active.date,active.sensor]);

  useEffect(() => {
    console.log('sortDate2 :: ',chartData )
  },[active])

  return (
    <React.Fragment>
      <h5>누적데이터</h5>
      <ButtonGroup>
        <Button
          name="bio_aerosol"
          active={active.sensor === "bio_aerosol"}
          onClick={handleClick}
          // style={{ marginRight: 5 }}
        >
          바이오에어로졸지수
        </Button>
        <Button
          name="air_quality"
          active={active.sensor === "air_quality"}
          onClick={handleClick}
          // style={{ marginRight: 5 }}
        >
          공기질지수
        </Button>
        <Button
          name="food_poisoning"
          active={active.sensor === "food_poisoning"}
          onClick={handleClick}
          // style={{ marginRight: 5 }}
        >
          식중독지수
        </Button>
        <Button
          name="particulate_matter"
          active={active.sensor === "particulate_matter"}
          onClick={handleClick}
        >
          미세먼지지수(PM2.5)
        </Button>
        <Button
            name="hydrogen_sulfide"
            active={active.sensor === "hydrogen_sulfide"}
            onClick={handleClick}
        >
          황화수소
        </Button>
        <Button
            name="ammonia"
            active={active.sensor === "ammonia"}
            onClick={handleClick}
        >
          암모니아
        </Button>
        <Button
            name="voc"
            active={active.sensor === "voc"}
            onClick={handleClick}
        >
          VOC
        </Button>
        <Button
            name="co2"
            active={active.sensor === "co2"}
            onClick={handleClick}
        >
          CO2
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
            name="day"
            active={active.date === "day"}
            onClick={handleDateClick}
            // style={{ marginRight: 5 }}
        >
          일
        </Button>
        <Button
            name="week"
            active={active.date === "week"}
            onClick={handleDateClick}
            // style={{ marginRight: 5 }}
        >
          주
        </Button>
        <Button
            name="month"
            active={active.date === "month"}
            onClick={handleDateClick}
            // style={{ marginRight: 5 }}
        >
          월
        </Button>
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
