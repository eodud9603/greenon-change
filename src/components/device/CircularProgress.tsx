import React from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';
import { CircularProgressbar } from 'react-circular-progressbar';

interface CircularProgressProps {
  title: string;
  color: string;
  progress: number;
  text: string;
}

const Container = styled.div`
  text-align: center;
  font-size: 12px;

  label {
    display: block;
    margin-bottom: 10px;
    color: ${(props) => props.color};
  }
`;

const ProgressWrapper = styled.div<{ rgbObj: any }>`
  flex: 1;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  position: relative;
  background: ${({ rgbObj }) =>
    `radial-gradient(#fff, rgba(${rgbObj.red},${rgbObj.green},${rgbObj.blue},0.2))`};
`;

const TextWrapper = styled.div<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${({ color }) => color};
  font-size: 14px;
  gap: 10px;

  strong {
    font-size: 18px;
  }
`;

const CircularProgress = ({
  title,
  color,
  progress,
  text,
}: CircularProgressProps) => {
  let rgbObj = hexRgb(color);

  return (
    <Container color={color}>
      <label>{title}</label>
      <ProgressWrapper rgbObj={rgbObj}>
        <CircularProgressbar
          value={progress}
          strokeWidth={5}
          styles={{
            path: { stroke: color, strokeLinecap: 'round' },
            text: { whiteSpace: 'pre-wrap' },
          }}
        />
        <TextWrapper color={color}>
          <strong>{progress.toString()}</strong>
          <p>{text}</p>
        </TextWrapper>
      </ProgressWrapper>
    </Container>
  );
};

export default CircularProgress;
