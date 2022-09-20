import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../static/images/mobile-background.png';

const AuthPageTemplate: React.FC = ({ children }) => {
  return <Template>{children}</Template>;
};

const Template = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background: url(${BackgroundImage}) repeat center center / cover;
  position: relative;
`;

export default AuthPageTemplate;
