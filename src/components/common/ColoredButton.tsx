import styled from 'styled-components';

const ColoredButton = styled.button<{ background?: string; color?: string }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) =>
    props.background ? props.background : '#007cba'};
  color: ${(props) => (props.color ? props.color : '#fff')};
  font-size: 16px;
`;

export default ColoredButton;
