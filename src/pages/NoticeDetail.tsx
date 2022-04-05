import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import moment from "moment";

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #f4f4f4;
  padding: 20px;
`;

const HeaderBottom = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #8b8b8b;
`;

const Body = styled.div`
  padding: 20px;
`;

const NoticeDetail = () => {
  const location = useLocation();
  const { state }: any = location;

  return (
    <React.Fragment>
      <ContentHeader title="공지사항" />
      {state ? (
        <>
          <Header>
            <div>{state.title}</div>
            <HeaderBottom>
              <div>관리자</div>
              <div>{moment(state.created_at).format("YYYY.MM.DD")}</div>
              <div>조회 {state.view_count}</div>
            </HeaderBottom>
          </Header>
          <Body>
            <div>
              {/* {state.content} */}
            </div>
            <div dangerouslySetInnerHTML={{ __html: state.content.replace(/\n/g, '<br/>') }} />
            {state.photoURL ? <img src={state.photoURL} alt="pic" /> : false}
          </Body>
        </>
      ) : (
        <div>Not Found</div>
      )}
    </React.Fragment>
  );
};

export default NoticeDetail;
