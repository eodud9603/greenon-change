import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Division } from "../components/common";
import { useRecoilValue } from 'recoil';

import { ReactComponent as ProfileIcon } from "../static/icons/icon-modifyprofile.svg";
import { ReactComponent as Icon1 } from "../static/icons/icon-mypage-1.svg";
import { ReactComponent as Icon2 } from "../static/icons/icon-mypage-2.svg";
import { ReactComponent as Icon3 } from "../static/icons/icon-mypage-3.svg";
import { ReactComponent as Icon4 } from "../static/icons/icon-mypage-4.svg";
import { ReactComponent as Icon5 } from "../static/icons/icon-mypage-5.svg";
import { ReactComponent as Icon6 } from "../static/icons/icon-mypage-6.svg";
import UserState from "../recoil/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  .info-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info-left {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .profile-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #e5f2f8;
  }

  .tab-grid {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: repeat(2, calc((100vw - 40px) / 3));
    grid-template-columns: repeat(3, minmax(auto, 1fr));

    @media (min-width: 1024px) {
      grid-template-rows: 100px;
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }

  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: white;
    gap: 10px;
    background-color: #28555f;

    p {
      font-size: 12px;
    }
  }

  .flex-box {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  .box {
    width: 100%;
    height: 200px;
    background: #28555f;
    border-radius: 10px;

    @media (min-width: 1024px) {
      width: 335px;
      height: 100px;
    }
  }
`;

const MyPageContainer = () => {
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="info-wrapper">
          <div className="info-left">
            <div className="profile-img" />
            <div>
              <p style={{ fontSize: 14, color: 'white' }}>{user?.name}</p>
              <p style={{ fontSize: 14, color: '#a6d4e9' }}>{user?.email}</p>
            </div>
          </div>
          <ProfileIcon
            onClick={() => navigate("/profile_edit")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Division />
        <div className="flex-box">
          <div className="tab-grid">
            <Link to="/products" className="tab">
              <Icon2 />
              <p>?????? ??????</p>
            </Link>
            <Link to="/notice" className="tab">
              <Icon3 />
              <p>????????????</p>
            </Link>
            <Link to="/usage" className="tab">
              <Icon4 />
              <p>?????? ??????</p>
            </Link>
            <Link to="/request" className="tab">
              <Icon5 />
              <p>????????????</p>
            </Link>
            <Link to="/company" className="tab">
              <Icon1 />
              <p>?????? ??????</p>
            </Link>
            <Link to="/settings" className="tab">
              <Icon6 />
              <p>??????</p>
            </Link>
          </div>
          <div className="box" />
        </div>
      </Container>
    </>
  );
};

export default MyPageContainer;
