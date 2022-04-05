import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.div`
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const AdBox = styled.div`
  width: 100%;
  height: 100px;
  background: #8b8b8b;
  border-radius: 20px;
`;

const Footer = () => {
  return (
    <FooterBox>
      {/* <AdBox /> */}
    </FooterBox>
  );
};

export default Footer;
