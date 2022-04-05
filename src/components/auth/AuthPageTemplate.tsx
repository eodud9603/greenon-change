import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../static/images/pc-background.png';

const AuthPageTemplate: React.FC = ({ children }) => {
  return <Template>{children}</Template>;
};

const Template = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${BackgroundImage}) no-repeat center center / cover;
  position: relative;
`;

export default AuthPageTemplate;
