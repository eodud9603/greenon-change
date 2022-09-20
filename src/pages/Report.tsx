import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ContentHeader } from '../components/base';
import UserState from '../recoil/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ToastState from '../recoil/toast';
import Smile from '../static/icons/smile.svg';
import BlankExpression from '../static/icons/blank_expression.svg';
import Sad from '../static/icons/sad.svg';
import Angry from '../static/icons/angry.svg';

import AirQualityActive from '../static/icons/air_quality_active.svg';
import AirQualityInActive from '../static/icons/air_quality_inactive.svg';
import BioAerosolActive from '../static/icons/bio_aerosol_active.svg';
import BioAerosolInActive from '../static/icons/bio_aerosol_inactive.svg';
import Co2Active from '../static/icons/co2_active.svg';
import Co2InActive from '../static/icons/co2_inactive.svg';
import CompoundSubstanceActive from '../static/icons/compound_substance_active.svg';
import CompoundSubstanceInActive from '../static/icons/compound_substance_inactive.svg';
import FoodPoisoningActive from '../static/icons/food_poisoning_active.svg';
import FoodPoisoningInActive from '../static/icons/food_poisoning_inactive.svg';
import TemperatureAndHumidityActive from '../static/icons/temperature_and_humidity_active.svg';
import TemperatureAndHumidityInActive from '../static/icons/temperature_and_humidity_inactive.svg';
import UltrafineDustActive from '../static/icons/ultrafine_dust_active.svg';
import UltrafineDustInActive from '../static/icons/ultrafine_dust_inactive.svg';

import AmmoniaActive from '../static/icons/ammonia_active.svg';
import AmmoniaInActive from '../static/icons/ammonia_inactive.svg';
import H2SActive from '../static/icons/h2s_active.svg';
import H2SInActive from '../static/icons/h2s_inactive.svg';

import { DeviceChart } from '../components/device';
import { apis } from '../lib/axios';
import { DeviceStatusType } from '../recoil/device';
import moment from 'moment';
import { Chart, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
    margin-top: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  //white-space: nowrap;
  overflow-x: scroll;
  width: calc(100vw - 32px);

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
  color: ${({ active }) => (active ? '#1ca5c7' : '#778d98')};
  font-size: 14px;
  border-bottom: solid 2px ${props => props.active ? '#1ca5c7' : 'transparent'};
`;

const SensorButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: scroll;
  width: calc(100vw - 40px);

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    &>* {margin-right: 10px; }
  }
`;

const SensorButton = styled.button<{ active?: boolean }>`
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
  color: ${({ active }) => active ? '#ff9a40' : '#778d98'};
  font-size: 10px;
  padding: 0;
  white-space: nowrap;
`;

const QualityWrapper = styled.div<{ backgroundColor: string }>`
background-color: ${props => props.backgroundColor};
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding: 20px;
color: white;
`;

const ChartWrapper = styled.div`
width: 100%;
background-color: #28555f;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
padding: 14px;
`;

const QualityView = ({ sensor, figure, quality }: { sensor: Sensor, figure: number, quality: Quality }) => {
    let src = Smile;
    let backgroundColor = '#7ccad7';
    switch (quality) {
      case 'good':
        src = Smile;
        backgroundColor = '#7ccad7';
        break;
      case 'normal':
        src = BlankExpression;
        backgroundColor = '#17b263';
        break;
      case 'bad':
        src = Sad;
        backgroundColor = '#ffc400';
        break;
      case 'extremely_bad':
        src = Angry;
        backgroundColor = '#ff5858';
        break;
      default:
        src = Smile;
        backgroundColor = '#7ccad7';
    };


  return (
    <QualityWrapper backgroundColor={backgroundColor}>
      <div>{SensorKoreanEnum[sensor]}</div>
      <img
        src={src}
        alt={quality}
        style={{ display: 'block', width: '33%', margin: '39px 0 24px 0' }}
      />
      <div>
        { quality === 'good' && '좋음' }
        { quality === 'normal' && '보통' }
        { quality === 'bad' && '나쁨' }
        { quality === 'extremely_bad' && '매우나쁨' }
      </div>
      수치 {figure}
    </QualityWrapper>
  )
};

type Quality = 'good' | 'normal' | 'bad' | 'extremely_bad';

enum SensorKoreanEnum {
  bio_aerosol = '바이오에어로졸지수',
  air_quality = '유해가스지수',
  food_poisoning = '식중독지수',
  particulate_matter = '초미세먼지',
  voc = '화합물질',
  co2 = '이산화탄소',
  temperature = '온도',
  humidity = '습도',
  ammonia = '암모니아',
  hydrogen_sulfide = '황화수소',
};

type Sensor = 'bio_aerosol' |
'air_quality' |
'food_poisoning' |
'particulate_matter' |
'voc' |
'co2' |
'temperature' |
'humidity' |
'ammonia' |
'hydrogen_sulfide';

interface IActive {
  sensor: Sensor;
  date: 'day' | 'week' | 'month' | 'year';
};

const Report = () => {
  const { id } = useParams();
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  const toast = useSetRecoilState(ToastState);

  const [active, setActive] = useState<IActive>({ sensor: 'bio_aerosol', date: 'day' });
  const [chartData, setChartData] = useState([]);

  const handleDateClick = (e:any) => {
    setActive(prev => ({
      ...prev,
      date: e.target.name
    }));
  };

  const handleSeneor = (sensor: Sensor) => {
    console.log('event', sensor);
    setActive(prev => {
      console.log('prev', prev);
      return {
        ...prev,
        sensor,
      };
    });
  };

  console.log('report params id', id);

  // TODO:
  const getQuality = (label: number): Quality => {
    return 'good';
  };

  const sortedData = useMemo(() => {
    return chartData.sort(
      (a: DeviceStatusType, b: DeviceStatusType) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    );
  }, [chartData]);

  // const data: any = useMemo(() => {
  //   return {
  //     labels: sortedData.map((data: DeviceStatusType) =>
  //       moment(data.createdAt).format(active.date === 'day' ? "HH:mm" : "MM-DD")
  //     ),
  //     datasets: [
  //       {
  //         data: sortedData.map((data: any) => data[active.sensor]),
  //         borderColor: "#007ba8",
  //         backgroundColor: "#fff",
  //       },
  //     ],
  //     fill: false,
  //   };
  //   console.log('sortDate1 :: ',sortedData )
  // }, [sortedData, active.sensor, active.date]);

  // const labels: Array<Sensor> = ['bio_aerosol', 'air_quality', 'food_poisoning'];

  const data1 = useMemo(() => {
    const datasets: any = [
      {
        type: 'line' as const,
        label: SensorKoreanEnum['bio_aerosol'],
        backgroundColor: '#007ba8',
        borderColor: '#007ba8',
        borderWidth: 2,
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 2,
        data: sortedData.map((data: any) => data['bio_aerosol']),
      },
      {
        type: 'line' as const,
        label: SensorKoreanEnum['air_quality'],
        backgroundColor: '#ef3f51',
        data: sortedData.map((data: any) => data['air_quality']),
        borderDash: [5, 15],
        borderColor: '#ef3f51',
        borderWidth: 3,
        pointBorderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 2,
      },
      {
        type: 'line' as const,
        label: SensorKoreanEnum['food_poisoning'],
        backgroundColor: '#bbbbbb',
        data: sortedData.map((data: any) => data['food_poisoning']),
        borderDash: [5, 5],
        borderColor: '#bbbbbb',
        borderWidth: 2,
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 2,
      }
    ];

    return {
      labels: sortedData.map((data: DeviceStatusType) => {
        return moment(data.createdAt).format(active.date === 'day' ? "HH:mm" : "MM-DD");
      }),
      datasets,
    };
  }, [sortedData, active.sensor, active.date]);

  const data2 = useMemo(() => {
    return {
      labels: sortedData.map((data: DeviceStatusType) =>
        moment(data.createdAt).format(active.date === 'day' ? "HH:mm" : "MM-DD")
      ),
      datasets: [
        {
          data: sortedData.map((data: any) => data[active.sensor]),
          borderColor: "#007ba8",
          backgroundColor: "#007ba8",
          label: SensorKoreanEnum[active.sensor],
          borderWidth: 2,
          pointBorderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 2,
        },
      ],
      fill: false,
    };
  }, [sortedData, active.sensor, active.date]);

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
  }, [active.date, active.sensor]);

  return (
    <>
      <ContentHeader title='리포트' />
      <Box>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'calc(100vw - 32px)',
        }}>
          <ButtonGroup>
            <Button
                name='day'
                active={active.date === 'day'}
                onClick={handleDateClick}
            >
              일
            </Button>
            <Button
                name='week'
                active={active.date === 'week'}
                onClick={handleDateClick}
            >
              주
            </Button>
            <Button
                name='month'
                active={active.date === 'month'}
                onClick={handleDateClick}
            >
              월
            </Button>
            <Button
                name='year'
                active={active.date === 'year'}
                onClick={handleDateClick}
            >
              년
            </Button>
          </ButtonGroup>
          <div style={{ fontSize: 12, color: '#1ca5c7', whiteSpace: 'nowrap' }}>24시간 기준</div>
        </div>
        <SensorButtonGroup>
          <SensorButton
            active={active.sensor === 'bio_aerosol'}
            onClick={() => handleSeneor('bio_aerosol')}
          >
            <img
              src={active.sensor === 'bio_aerosol' ? BioAerosolActive : BioAerosolInActive}
              alt='bio_aerosol'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.bio_aerosol}</div>
          </SensorButton>
          <SensorButton
            name='air_quality'
            active={active.sensor === 'air_quality'}
            onClick={() => handleSeneor('air_quality')}
          >
            <img
              src={active.sensor === 'air_quality' ? AirQualityActive : AirQualityInActive}
              alt='air_quality'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.air_quality}</div>
          </SensorButton>
          <SensorButton
            name='food_poisoning'
            active={active.sensor === 'food_poisoning'}
            onClick={() => handleSeneor('food_poisoning')}
          >
            <img
              src={active.sensor === 'food_poisoning' ? FoodPoisoningActive : FoodPoisoningInActive}
              alt='food_poisoning'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.food_poisoning}</div>
          </SensorButton>
          <SensorButton
            name='particulate_matter'
            active={active.sensor === 'particulate_matter'}
            onClick={() => handleSeneor('particulate_matter')}
          >
            <img
              src={active.sensor === 'particulate_matter' ? UltrafineDustActive : UltrafineDustInActive}
              alt='particulate_matter'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.particulate_matter}</div>
          </SensorButton>
          <SensorButton
            name='voc'
            active={active.sensor === 'voc'}
            onClick={() => handleSeneor('voc')}
          >
            <img
              src={active.sensor === 'voc' ? CompoundSubstanceActive : CompoundSubstanceInActive}
              alt='voc'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.voc}</div>
          </SensorButton>
          <SensorButton
            name='co2'
            active={active.sensor === 'co2'}
            onClick={() => handleSeneor('co2')}
          >
            <img
              src={active.sensor === 'co2' ? Co2Active : Co2InActive}
              alt='co2'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.co2}</div>
          </SensorButton>
          {/* TODO:  온도 이미지 */}
          <SensorButton
            name='temperature'
            active={active.sensor === 'temperature'}
            onClick={() => handleSeneor('temperature')}
          >
            <img
              src={active.sensor === 'temperature' ? TemperatureAndHumidityActive : TemperatureAndHumidityInActive}
              alt='temperature'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.temperature}</div>
          </SensorButton>
          {/* TODO:  습도 이미지 */}
          <SensorButton
            name='humidity'
            active={active.sensor === 'humidity'}
            onClick={() => handleSeneor('humidity')}
          >
            <img
              src={active.sensor === 'humidity' ? TemperatureAndHumidityActive : TemperatureAndHumidityInActive}
              alt='humidity'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.humidity}</div>
          </SensorButton>
          {/* TODO: 암모니아 이미지 */}
          <SensorButton
            name='ammonia'
            active={active.sensor === 'ammonia'}
            onClick={() => handleSeneor('ammonia')}
          >
            <img
              src={active.sensor === 'ammonia' ? AmmoniaActive : AmmoniaInActive}
              alt='ammonia'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.ammonia}</div>
          </SensorButton>

          {/* TODO: 황화수소 이미지 */}
          <SensorButton
            name='hydrogen_sulfide'
            active={active.sensor === 'hydrogen_sulfide'}
            onClick={() => handleSeneor('hydrogen_sulfide')}
          >
            <img
              src={active.sensor === 'hydrogen_sulfide' ? H2SActive : H2SInActive}
              alt='hydrogen_sulfide'
              style={{ display: 'block', width: 34 }}
            />
            <div>{SensorKoreanEnum.hydrogen_sulfide}</div>
          </SensorButton>
        </SensorButtonGroup>
        <QualityView
          sensor={active.sensor}
          figure={10}
          quality={getQuality(10)}
        />
        <div style={{ padding: 14, width: '100%' }}>
          <ChartWrapper>
            { active.sensor === 'bio_aerosol'
              ? (
                <Chart
                  type='bar'
                  data={data1}
                  options={{
                  }}
                />
              )
              : (
                <Line
                  data={data2}
                  // options={{
                  //   legend: {
                  //     display: true,
                  //     labels: {
                  //       boxWidth: 50,
                  //       fontSize: 25,
                  //       fontColor: "gray"
                  //     }
                  //   }
                  // }}
                />
              )
            }

            {/* <Line
              data={data}
              options={{
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
              }}
            /> */}
          </ChartWrapper>
        </div>
      </Box>
    </>
  );
};

export default memo(Report);
