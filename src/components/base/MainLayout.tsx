import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BottomTab, Footer, Header, MobileHeader, Sider, Toast } from ".";
import ResponsiveModal from "../modal/ResponsiveModal";
import { Outlet } from "react-router-dom";
// import useStore from "../../stores";
// import { runInAction } from "mobx";
// import { useObserver } from "mobx-react";

const MainLayoutBox = styled.div`
  width: 100%;
  min-width: 375px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #007cba;
  overflow: hidden;
`;

const MainBox = styled.div`
  width: 100%;
  display: flex;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  border-bottom: 1px solid #e5f2f8;
  flex-grow: 1;
  overflow: hidden;
`;

const ContentBox = styled.div`
  flex-grow: 1;
  position: relative;
`;

const MainLayout = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // const { user, etc, device } = useStore();

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      /* runInAction(() => {
        if (window.innerWidth < 1710) {
          device.offset = 6;
          device.numPage = Math.ceil(device.devices.length / 6);
        } else {
          device.offset = 8;
          device.numPage = Math.ceil(device.devices.length / 8);
        }
      }); */
    };

    // device.init();
    // user.init();
    // etc.init();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [/* device, etc, user */]);

  return /* useObserver(() => */ (
    <MainLayoutBox>
      {innerWidth < 1024 ? <MobileHeader /> : <Header />}
      <MainBox>
        <ContentBox>
          <Outlet />
        </ContentBox>
        <Sider />
      </MainBox>
      <Footer />
      <BottomTab />
      <ResponsiveModal />
      {/* <Toast /> */}
    </MainLayoutBox>
  )/* ); */
};

export default MainLayout;
