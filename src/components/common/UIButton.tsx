import styled from "styled-components";

const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.blue};
  background: ${(props) => props.theme.colors.lightblue};
  transition: all 0.5s;

  &:hover {
    background: ${(props) => props.theme.colors.blue};
    color: #fff;
  }
`;

export default Button;
