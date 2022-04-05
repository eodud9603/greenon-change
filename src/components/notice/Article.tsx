import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ArticleBox = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px;
  gap: 20px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 20px;
`;

const BottomBox = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #8b8b8b;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: #e5f2f8;
  flex-shrink: 0;
`;

const Article = ({ data }: { data: any }) => {
  return (
    <ArticleBox to={`/notice/${data.id}`} state={data}>
      <LeftBox>
        <p>{data.title}</p>
        <BottomBox>
          <label>관리자</label>
          <label>{moment(data.created_at).format("YYYY.MM.DD")}</label>
          <label>조회 {data.view_count}</label>
        </BottomBox>
      </LeftBox>
      {data.photoURL ? <Thumbnail src={data.photoURL} /> : false}
    </ArticleBox>
  );
};

export default Article;
