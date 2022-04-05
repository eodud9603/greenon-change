import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../../static/icons/btn-back.svg';

const BaseHeader = ({ headerTitle }: { headerTitle: string }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div style={{ flex: 1 }}>
        <BackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
      </div>
      <div style={{ flex: 2, textAlign: 'center' }}>{headerTitle}</div>
      <div style={{ flex: 1 }} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333333;
  background: #fff;
  height: 50px;
  padding: 0 10px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
`;

export default BaseHeader;
