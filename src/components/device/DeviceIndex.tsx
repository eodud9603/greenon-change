import React from "react";
import styled from "styled-components";
import { CircularProgress } from ".";
import { DeviceStatusType } from "../../recoil/device";
import {useRecoilState} from "recoil";
import ModalState from "../../recoil/modal";
// import { IDeviceData } from "../../stores/device";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const ContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 26px;
  margin-bottom: 50px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InlineRow = styled.div<{ noline?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 12.5px; */
  border-right: solid 1px ${props => props.noline ? 'transparent' : 'white'};
`;

const InlineCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeviceIndex = ({ data }: { data: DeviceStatusType }) => {
  const [modal,setModal] = useRecoilState(ModalState);

  console.log('device data', data);

  return (
    <Box>
      <div style={{
        fontSize: 14,
        color: 'white',
      }}>
        통합 실내 바이오오에어로졸 지수
      </div>
      <ContainerRow>
        <CircularProgress
          onClick={() => setModal({ ...modal, visible: true ,type:'infoDevice',infoDevice:{ title:"바이오에어로졸지수"}})}
          title="공기질"
          // TODO: 데이터 바꿔줘야함
          progress={data.air_quality}
          // color="#007cba"
          color={
            data.air_quality <= 32.5 ?
              '#7ccad7' :
              data.air_quality <= 45.5 ?
                '#17b263' :
                data.air_quality <= 68 ?
                  '#ffc400' :
                  68 < data.air_quality && '#ff5858'
          }
          text={
            data.air_quality <= 32.5 ?
              '좋음' :
              data.air_quality <= 45.5 ?
                '보통' :
                data.air_quality <= 68 ?
                  '나쁨' :
                  68 <  data.air_quality && '매우나쁨'
          }
        />
        <div style={{width:20}}/>
        <CircularProgress
          onClick={() => setModal({ ...modal, visible: true ,type:'infoDevice',infoDevice:{ title:"공기질지수"}})}
          title="감염상태"
          // TODO: 데이터 바꿔줘야함
          progress={data.bio_aerosol}
          color={
            data.bio_aerosol <= 50 ?
              '#7ccad7' :
              data.bio_aerosol <= 100 ?
                '#17b263' :
                data.bio_aerosol <= 250 ?
                  '#ffc400' :
                  250 < data.bio_aerosol && '#ff5858'
          }
          text={
            data.bio_aerosol <= 50 ?
              '좋음' :
              data.bio_aerosol <= 100 ?
                '보통' :
                data.bio_aerosol <= 250 ?
                  '나쁨' :
                  250 < data.bio_aerosol && '매우나쁨'
          }
        />
        {/*00baba*/}
        {/*<CircularProgress*/}
        {/*    onClick={() => setModal({ ...modal, visible: true ,type:'infoDevice',infoDevice:{ title:"식중독지수"}})}*/}
        {/*  title="식중독지수"*/}
        {/*  progress={data.food_poisoning}*/}
        {/*  color={data.food_poisoning <= 55 ? '#7ccad7' : data.food_poisoning <= 71 ? '#17b263' : data.food_poisoning <= 86 ? '#ffc400' : 86 < data.food_poisoning  && '#ff5858'}*/}
        {/*  text={data.food_poisoning <= 55 ? '좋음' : data.food_poisoning <= 71 ? '보통' : data.food_poisoning <= 86 ? '나쁨' : 86 < data.food_poisoning && '매우나쁨'}*/}
        {/*/>*/}
      </ContainerRow>
      <Row>
        <InlineRow>
          <InlineCol>
            <label style={{ color: "#778d98", fontSize: 12, marginBottom: 5 }}>Pm2.5</label>
            <p style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{data.particulate_matter}pm</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <InlineCol>
            <label style={{ color: "#778d98", fontSize: 12, marginBottom: 5 }}>VOCs</label>
            <p style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{data.voc}ppm</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <InlineCol>
            <label style={{ color: "#778d98", fontSize: 12, marginBottom: 5 }}>CO2</label>
            <p style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{data.co2}ppm</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <InlineCol>
            <label style={{ color: "#778d98", fontSize: 12, marginBottom: 5 }}>온도</label>
            <p style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{data.temperature}°C</p>
          </InlineCol>
        </InlineRow>
        <InlineRow noline>
          <InlineCol>
            <label style={{ color: "#778d98", fontSize: 12, marginBottom: 5 }}>습도</label>
            <p style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{data.humidity}%</p>
          </InlineCol>
        </InlineRow>
      </Row>
    </Box>
  );
};

export default DeviceIndex;
