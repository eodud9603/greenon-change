import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../../static/icons/btn-back.svg';
import { ReactComponent as HeaderRight } from '../../static/icons/header-right.svg';

const ContentHeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: white;
  background: transparent;
  height: 50px;
  padding: 0 16px;
`;

const ContentHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <ContentHeaderBox>
      <div>
        <BackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
      </div>
      <div style={{ flex: 2, textAlign: 'center' }}>{title}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HeaderRight style={{ cursor: 'pointer' }} onClick={() => {}} />
      </div>
    </ContentHeaderBox>
  );
};

export default ContentHeader;
