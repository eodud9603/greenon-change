import React, {useEffect, useMemo} from "react";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import DeviceState, {DeviceCurrentStatusState} from "../../recoil/device";

export const Container = styled.div`
  position: fixed;
  left: 50%; top: 50%;
  transform: translate(-50%,-50%);
  background-color: #ffffff;
  border-radius: 20px;
  padding: 0;
  width: 100%;
  max-width: 400px;
  @media screen and (max-width: 400px) {
    /* 모바일 사이즈 */
      left: 0;
      top: auto; bottom: 0;
      transform: translate(0,0);
      border-radius: 0;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
  }
`;
export const ParentsTitle = styled.div`
  height: 50px;
  text-align: center;
  line-height: 50px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.04);
  position: relative;
  font-size: 16px;
  font-weight: normal;
  margin: 0;
`;
export const ContentsContainer = styled.div`
  padding: 30px 10px 34px;
`;
export const ContentsTitle = styled.p`
  font-size: 14px;
  word-break: break-all;
  line-height: 1.5;
  text-align: center;
  margin: 0;
`;
export const GraphNumContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 8px;
`;
export const GraphTextContainer = styled.div`
  margin: 0 auto;
  width: calc(100% - 15px); height: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
`;
export const GraphNumBox = styled.span`
  display: block;
  font-size: 10px;
  color: #333333;
  background-color: #e5f2f8;
  border-radius: 10px;
  height: 20px; width: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
`;
export const GraphTextBox = styled.span`
  //display: block;
  width: 25%; height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: #ffffff;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  //border-radius: 15px;
  background-color: #007cba;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 36px;
  height: 50px;
  border: none;
`;

const InfoDevice = (props) => {
    const {title} = props;
    const data = useRecoilState(DeviceState);
    const data2 = useRecoilState(DeviceCurrentStatusState);
    let arr = useMemo(() => {
        switch (title){
            case '바이오에어로졸지수' :
               return [0,32.5,45.5,68];
            case '공기질지수' :
                return [0,50,100,250];
            case '식중독지수' :
                return [0,55,71,86];
            default: return [0,0,0,0];
        }
    },[title]);

    // useEffect(()=>{
    //     console.log(data);
    //     console.log(data2)
    // },[title])

    return (
        <>
            {/*<Container>*/}
                <ContentsContainer>
                    <ContentsTitle>공기질 지수와 식중독지수 등 으로 부유미생물을 예측하여, 설치된 환경의 종합적인 대기 환경지수를 나타냄</ContentsTitle>
                    <GraphNumContainer>
                        <GraphNumBox>0</GraphNumBox>
                        <GraphNumBox>{arr[1]}</GraphNumBox>
                        <GraphNumBox>{arr[2]}</GraphNumBox>
                        <GraphNumBox>{arr[3]}</GraphNumBox>
                        {/*<GraphNumBox>100</GraphNumBox>*/}
                    </GraphNumContainer>
                    <GraphTextContainer>
                        <GraphTextBox style={{backgroundColor:'#007cba'}}>좋음</GraphTextBox>
                        <GraphTextBox style={{backgroundColor:'#00ff93'}}>보통</GraphTextBox>
                        <GraphTextBox style={{backgroundColor:'#ffc400'}}>나쁨</GraphTextBox>
                        <GraphTextBox style={{backgroundColor:'#ff0000'}}>매우 나쁨</GraphTextBox>
                    </GraphTextContainer>
                    <SubmitBtn>확인</SubmitBtn>
                </ContentsContainer>
            {/*</Container>*/}

        </>
    );
};

export default InfoDevice;
