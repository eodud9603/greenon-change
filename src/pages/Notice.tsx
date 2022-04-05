import React from "react";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import { Article } from "../components/notice";
import { apis } from "../lib/axios";

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Notice = () => {
  const [notices, setNotices] = React.useState([]);

  React.useEffect(() => {
    apis.getNotices().then((res) => {
      setNotices(res.data);
    });
  }, []);

  return (
    <>
      <ContentHeader title="공지사항" />
      <ArticleList>
        {notices.map((notice) => (
          <Article key={notice.id} data={notice} />
        ))}
      </ArticleList>
    </>
  );
};

export default Notice;
