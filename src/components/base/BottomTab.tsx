import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as GBN1 } from "../../static/icons/icon-gnb-1.svg";
import { ReactComponent as GBN2 } from "../../static/icons/icon-gnb-2.svg";
import { ReactComponent as GBN3 } from "../../static/icons/icon-gnb-3.svg";
import { ReactComponent as GBN4 } from "../../static/icons/icon-gnb-4.svg";

const BottomTab = () => {
  // const { device } = useStore();

  // return useObserver(() => {
    return (
      <Container>
        <TabItem path="/" icon={<GBN1 />} />
        {/* <TabItem
          path={
            device.devices[0]
              ? `/devices/${device.devices[0].id}`
              : "/devices/no-container"
          }
          icon={<GBN2 />}
        /> */}
        <TabItem path="/manage/1" icon={<GBN3 />} />
        <TabItem path="/mypage" icon={<GBN4 />} />
      </Container>
    );
  // });
};

const TabItem = ({ icon, path }: { icon: React.ReactNode; path: string }) => {
  const pathname = window.location.pathname;

  return (
    <NavItem active={pathname === path}>
      <Link to={path}>{icon}</Link>
    </NavItem>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px 20px 30px 20px;
  box-shadow: 0px -1px 5px 5px rgba(0, 0, 0, 0.05);
  z-index: 999;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.div<{ active?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    path:not(:first-of-type) {
      stroke: ${({ active, theme }) =>
        active ? "#007cba" : "#b1cad6"} !important;
    }
    circle {
      stroke: ${({ active, theme }) =>
        active ? "#007cba" : "#b1cad6"} !important;
    }
  }
`;

export default BottomTab;
