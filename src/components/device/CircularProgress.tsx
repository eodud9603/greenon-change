import React from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface CircularProgressProps {
  title: string;
  color: string;
  progress: number;
  text: string;
  onClick: () => void;
}

const Container = styled.div`
  text-align: center;
  font-size: 12px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 10px;
    color: ${(props) => props.color};
  }
`;

const ProgressWrapper = styled.div<{ rgbObj: any }>`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  /* background: ${({ rgbObj }) =>
    `radial-gradient(#fff, rgba(${rgbObj.red},${rgbObj.green},${rgbObj.blue},0.2))`}; */
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
  onClick
}: CircularProgressProps) => {
  let rgbObj = hexRgb(color);

  return (
    <Container color={color} onClick={onClick}>
      <ProgressWrapper rgbObj={rgbObj}>
        <CircularProgressbar
          value={progress}
          strokeWidth={8}
          circleRatio={0.9}
          styles={buildStyles({
            // path: { stroke: color, strokeLinecap: 'round' },
            // text: { whiteSpace: 'pre-wrap' },
            rotation: 0.55,
            strokeLinecap: "butt",
            trailColor: "#778d98",
            pathColor: `${color}`,
          })}
        />
        <TextWrapper color={color}>
          <label style={{ fontSize: 12, color: 'white' }}>{title}</label>
          <strong style={{ fontSize: 46 }}>{progress.toString()}</strong>
          <p style={{ fontSize:12 }}>{text}</p>
        </TextWrapper>
      </ProgressWrapper>
    </Container>
  );
};

export default CircularProgress;
