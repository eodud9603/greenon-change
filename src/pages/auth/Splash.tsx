import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthPageTemplate } from "../../components/auth";
import { Button } from "../../components/common";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { ReactComponent as KakaoLogin } from "../../static/icons/kakao.svg";
import { ReactComponent as GoogleLogin } from "../../static/icons/google.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Splash1 from '../../static/images/splash-1.png';
import Splash2 from '../../static/images/splash-2.png';
import Splash4 from '../../static/images/splash-4.png';

const StyledSlider = styled(Slider)`
.slick-slide > div > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
}
`;

const DotLayout = styled.div`
display: flex;
align-items: center;
gap: 8px;
`;

const Dot = styled.div<{ active: boolean }>`
width: 8px;
height: 8px;
background-color: ${props => props.active ? '#ffffff' : '#ffffff30'};
border-radius: ${Number.MAX_SAFE_INTEGER}px;
`;

interface IDots {
  index: number;
  length: number;
};

const Dots: React.FC<IDots> = (props) => {
  return (
    <DotLayout>
      { [...Array(props.length)].map((x, i) => (
        <Dot
          key={i}
          active={i === props.index}
        />
      ))}
    </DotLayout>
  );
};

const Splash = () => {
  const { onClickLogin:onClickKakaoLogin } = useKakaoLogin({ baseUri: window.location.origin });
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);

  return (
    <AuthPageTemplate>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 0',
      }}>
        <Dots
          index={currentIndex}
          length={4}
        />
      </div>
      <StyledSlider
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        afterChange={index => {
          setCurrentIndex(index);
        }}
        arrows={false}
        // centerMode={true}
      >
        <div>
          <SliderBox>
            <img
              src={Splash1}
              height='100%'
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </SliderBox>
          <SliderTitle>스마트 공간해충살균기</SliderTitle>
          <SliderContent>
            환경 및 위생 관리를 위해
          </SliderContent>
          <SliderContent>
            감염예방 모니터링을 제공합니다.
          </SliderContent>
        </div>
        <div>
          <SliderBox style={{
            paddingTop: 36,
          }}>
            <img
              src={Splash2}
              style={{ width: '90%', margin: 'auto' }}
            />
          </SliderBox>
          <SliderTitle>바이오에어로졸 예측 지수</SliderTitle>
          <SliderContent>
            공기중의 미세먼지, 악취 등의 공기질 지수와
          </SliderContent>
          <SliderContent>
            식중독지수 등으로 세균과 바이러스를 상태를
          </SliderContent>
          <SliderContent>
            예측하는 바이오에어로졸 지수를 제공합니다.
          </SliderContent>
        </div>
        <div>
          <SliderBox>

          </SliderBox>
          <SliderTitle>공기질 및 위생 감염예방 분석</SliderTitle>
          <SliderContent>
            공간해충살균기 설치 지점의 데이터를
          </SliderContent>
          <SliderContent>
            차트, 표를 통해 체계적으로 분석할 수 있으며,
          </SliderContent>
          <SliderContent>
            매월 공기질 지수, 식중독지수 등으로
          </SliderContent>
          <SliderContent>
            바이오에어로졸  지수를 분석하여 환경위생 관리를 효과적
          </SliderContent>
          <SliderContent>
            으로  할 수 있습니다.
          </SliderContent>
        </div>
        <div>
          <SliderBox style={{
            background: 'transparent',
          }}>
            <img
              src={Splash4}
              width='100%'
            />
          </SliderBox>
          <SliderTitle>GREEN SHOP</SliderTitle>
          <SliderContent>
            그린터치는 바오에어로졸 예측지수를
          </SliderContent>
          <SliderContent>
            활용하여 해충방제와 살균소독을 제어하는
          </SliderContent>
          <SliderContent>
            2 in 1 제품입니다.
          </SliderContent>
        </div>
      </StyledSlider>
      <Container>
        <Modal>
          <div style={{
            display: 'flex',
            width: '100%',
            gap: 8,
            marginBottom: 10,
          }}>
            <div style={{ width: '100%' }}>
              <Link to='/login'>
                <Button>로그인</Button>
              </Link>
            </div>
            <button style={{ padding: 0 }} onClick={onClickKakaoLogin}>
              <KakaoLogin />
            </button>
            <button style={{ padding: 0 }} onClick={() => {}}>
              <GoogleLogin />
            </button>
            <button style={{ padding: 0 }} onClick={onClickKakaoLogin}>
              <KakaoLogin />
            </button>
          </div>
          <Button style={{
            background: '#e5f2f8',
            color: '#1ca5c7',
            marginBottom: 24,
          }}>
            <Link to="/register">회원가입</Link>
          </Button>
          <div style={{
            color: '#989898',
            fontSize: 14,
            textDecoration: 'underline',
            textAlign: 'center',
          }}>
            <Link to="/find_email">이메일·비밀번호 찾기</Link>
          </div>
        </Modal>
      </Container>
    </AuthPageTemplate>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 540px) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const Modal = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 25px 16px 30px 16px;

  @media (min-width: 540px) {
    border-radius: 20px;
  }
`;

const SliderBox = styled.div`
border-radius: 10px;
background: #28555f;
margin: auto;
width: calc(100vw - 32);
height: 76vw;
max-width: 540px;
max-height: 410px;
position: relative;
margin-bottom: 31px;
`;

const SliderTitle = styled.div`
margin-bottom: 16px;
font-size: 18px;
font-weight: bold;
line-height: 1.17;
color: white;
text-align: center;
`;

const SliderContent = styled.div`
font-size: 14px;
line-height: 1.64;
text-align: center;
color: #a6d4e9;
`;

export default Splash;
