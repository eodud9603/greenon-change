import { useObserver } from "mobx-react";
import React from "react";
import styled from "styled-components";
// import useStore from "../../stores";

const Box = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Page = styled.div<{ active?: boolean }>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: ${(props) => (props.active ? "#ddf4ff" : "#f7f7f7")};
  color: ${(props) => (props.active ? "#007ba8" : "#8b8b8b")};
  text-align: center;
  line-height: 50px;
`;

const Pagenation = () => {
  // const { device } = useStore();

  return (
    <Box>
      {/* {Array(device.numPage)
        .fill(null)
        .map((_, index) => (
          <Page
            key={index}
            active={index === device.page}
            onClick={() => device.setPage(index)}
          >
            {index + 1}
          </Page>
        ))} */}
    </Box>
  );
};

export default Pagenation;
