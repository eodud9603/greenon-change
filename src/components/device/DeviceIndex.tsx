import React from "react";
import styled from "styled-components";
import { CircularProgress } from ".";
import { DeviceStatusType } from "../../recoil/device";
import { ReactComponent as Icon1 } from "../../static/icons/icon-1.svg";
import { ReactComponent as Icon2 } from "../../static/icons/icon-2.svg";
import { ReactComponent as Icon3 } from "../../static/icons/icon-3.svg";
import {useRecoilState} from "recoil";
import ModalState from "../../recoil/modal";
// import { IDeviceData } from "../../stores/device";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InlineRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const InlineCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeviceIndex = ({ data }: { data: DeviceStatusType }) => {
  const [modal,setModal] = useRecoilState(ModalState);

  return (
    <Box>
      <Row>
        <CircularProgress
          onClick={() => setModal({ ...modal, visible: true ,type:'infoDevice',infoDevice:{ title:"바이오에어로졸지수"}})}
          title="바이오에어로졸지수"
          progress={data.bio_aerosol}
          // color="#007cba"
          color={data.bio_aerosol <= 32.5 ? '#00c4ff' : data.bio_aerosol <= 45.5 ? '#00baba' : data.bio_aerosol <= 68 ? '#ffc400' : 68 < data.bio_aerosol && '#ff0000'}
          text={data.bio_aerosol <= 32.5 ? '좋음' : data.bio_aerosol <= 45.5 ? '보통' : data.bio_aerosol <= 68 ? '나쁨' : 68 <  data.bio_aerosol && '매우나쁨'}
        />
        <CircularProgress
            onClick={() => setModal({ ...modal, visible: true ,type:'infoDevice',infoDevice:{ title:"공기질지수"}})}
          title="공기질지수"
          progress={data.air_quality}
          color={data.air_quality <= 50 ? '#00c4ff' : data.air_quality <= 100 ? '#00baba' : data.air_quality <= 250 ? '#ffc400' : 250 < data.air_quality && '#ff0000'}
          text={data.air_quality <= 50 ? '좋음' : data.air_quality <= 100 ? '보통' : data.air_quality <= 250 ? '나쁨' : 250 < data.air_quality && '매우나쁨'}
        />
        {/*00baba*/}
        <CircularProgress
            onClick={() => setModal({ ...modal, visible: true ,type:'infoDevice',infoDevice:{ title:"식중독지수"}})}
          title="식중독지수"
          progress={data.food_poisoning}
          color={data.food_poisoning <= 55 ? '#00c4ff' : data.food_poisoning <= 71 ? '#00baba' : data.food_poisoning <= 86 ? '#ffc400' : 86 < data.food_poisoning  && '#ff0000'}
          text={data.food_poisoning <= 55 ? '좋음' : data.food_poisoning <= 71 ? '보통' : data.food_poisoning <= 86 ? '나쁨' : 86 < data.food_poisoning && '매우나쁨'}
        />
      </Row>
      <Row>
        <InlineRow>
          <Icon1 />
          <InlineCol>
            <label style={{ color: "#8b8b8b" }}>미세먼지(PM2.5)</label>
            <p style={{ fontSize: 14 }}>{data.particulate_matter}PM</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <Icon2 />
          <InlineCol>
            <label style={{ color: "#8b8b8b" }}>온도</label>
            <p style={{ fontSize: 14 }}>{data.temperature}°C</p>
          </InlineCol>
        </InlineRow>
        <InlineRow>
          <Icon3 />
          <InlineCol>
            <label style={{ color: "#8b8b8b" }}>습도</label>
            <p style={{ fontSize: 14 }}>{data.humidity}%</p>
          </InlineCol>
        </InlineRow>
      </Row>
    </Box>
  );
};

export default DeviceIndex;
