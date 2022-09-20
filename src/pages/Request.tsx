import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import {
  CheckInput,
  TextInput,
  PhotoInput,
  TextArea,
} from "../components/common";
import { apis } from "../lib/axios";
import ToastState from "../recoil/toast";
import UserState from "../recoil/user";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
    padding: 0;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const Request = () => {
  const user = useRecoilValue(UserState);
  const [inputs, setInputs] = React.useState<{
    username: string,
    phone: string,
    email: string,
    title: string,
    content: string,
  }>({
    username: "",
    phone: "",
    email: "",
    title: "",
    content: "",
  });
  const imgRef = useRef<File>(null);
  const setToast = useSetRecoilState(ToastState);
  const [checked, setChecked] = useState(false);
  const [submit, setSubmit] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    // if (!inputs.username) return setToast({ open: true, message: '성함을 입력해주세요.', type: 'warning' });
    // if (!inputs.phone) return setToast({ open: true, message: '연락처를 입력해주세요.', type: 'warning' });
    // if (!inputs.email) return setToast({ open: true, message: '메일주소를 입력해주세요.', type: 'warning' });
    // if (!inputs.title) return setToast({ open: true, message: '제목을 입력해주세요.', type: 'warning' });
    // if (!inputs.content) return setToast({ open: true, message: '문의 내용을 입력해주세요.', type: 'warning' });

    if (!checked) return setToast({ open: true, message: '동의 항목에 체크해주세요.', type: 'warning' });
    if (!user) return setToast({ open: true, message: '유저 정보를 불러올 수 없습니다.', type: 'warning' });

    let fd = new FormData();
    fd.append('userId', user.id.toString());
    fd.append('username', inputs.username);
    fd.append('phone', inputs.phone);
    fd.append('email', inputs.email);
    fd.append('title', inputs.title);
    fd.append('content', inputs.content);
    if (imgRef.current)
      fd.append('image', imgRef.current);

    apis.createRequest(fd).then((res) => {
      if (res.status === 201 && res.data.result === true) {
        setToast({ open: true, message: '성공적으로 작성되었습니다.', type: 'success' });
        navigate(-1);
      } else {
        setToast({ open: true, message: '문의사항 작성에 실패했습니다.', type: 'error' });
      }
    });
  };

  /* const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }; */

  const uploadImage = (e: any) => {
    const img = e.target.files[0];
    imgRef.current = img;
    // setInputs((prev) => ({ ...prev, image: img }));
  };
  const onChangeCheckbox = (e:any) => {
    setChecked(e.target.checked);
  }

  React.useEffect(() => {
    if (Object.values(inputs).every((i) => i !== "")) {
      setSubmit(true);
    }
  }, [inputs]);

  useEffect(() => {
    if (user) {
      setInputs({
        ...inputs,
        username: user.name || inputs.username,
        email: user.email || inputs.email
      });
    }
  }, [user]);

  return (
    <>
      <ContentHeader title="문의하기" />
      <Box>
        <TextInput
          name="username"
          type="text"
          label="성함"
          value={inputs.username}
          onChange={e => setInputs({ ...inputs, username: e.target.value })}
        />
        <TextInput
          name="phone"
          type="text"
          label="연락처"
          value={inputs.phone}
          onChange={e => setInputs({ ...inputs, phone: e.target.value })}
        />
        <TextInput
          name="email"
          type="email"
          label="메일주소"
          value={inputs.email}
          onChange={e => setInputs({ ...inputs, email: e.target.value })}
        />
        <TextInput
          name="title"
          type="text"
          label="제목"
          value={inputs.title}
          onChange={e => setInputs({ ...inputs, title: e.target.value })}
        />
        <TextArea
          name="content"
          label="문의 내용"
          value={inputs.content}
          onChange={e => setInputs({ ...inputs, content: e.target.value })}
        />
        <PhotoInput label="문의 내용" name="image" onChange={uploadImage} />
        <CheckInput title="개인정보 수집이용 동의" id="check1" onChange={onChangeCheckbox} />
        <Button
          variant="contained"
          size="large"
          style={{
            background: submit ? "#007cba" : "rgba(0, 0, 0, 0.12)",
            fontSize: 16,
            boxShadow: "none",
            color:'#fff'
          }}
          disabled={!submit}
          onClick={onSubmit}
        >
          제출
        </Button>
      </Box>
    </>
  );
};

export default Request;
