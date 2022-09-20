import React from 'react';
import styled from 'styled-components';
import { BaseHeader } from '../common';

interface AuthDynamicModalProps {
    headerTitle: string;
    children?: React.ReactNode;
}

const AuthDynamicModal: React.FC<AuthDynamicModalProps> = ({
                                                               headerTitle,
                                                               children,
                                                           }) => {
    return (
        <DynamicBox>
            <BaseHeader headerTitle={headerTitle} />
            <ModalContent>{children}</ModalContent>
        </DynamicBox>
    );
};

const DynamicBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 540px) {
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 500px;
    width: 500px;
    height: 80%;
    margin: 0 auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow: hidden;
  }
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  padding: 20px;
  flex-grow: 1;
  /* gap: 20px; */
  padding-top: 40px;

  @media (min-width: 540px) {
    width: 420px;
    min-width: 420px;
    margin: 0 auto;
  }
`;

export default AuthDynamicModal;
