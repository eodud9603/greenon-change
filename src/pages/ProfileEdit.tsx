import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import { Button, TextInput } from "../components/common";
import UserState from "../recoil/user";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ToastState from "../recoil/toast";
import { apis } from "../lib/axios";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;
  padding: 20px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
  }
`;
const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #d1d1d1;
`;

const ProfileEdit = () => {
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  const toast = useSetRecoilState(ToastState);
  
  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);

  const handleClickConfirm = () => {
    if (!phone.match(/^[0-9]{8,11}$/))
      return toast({ open: true, message: '전화번호는 숫자 8 ~ 11자리로만 입력 가능합니다.', type: 'error' });
    
    apis.updateUserInfo(user.id, { phone }).then(({ status, data }) => {
      if (status === 200 && data.affected) {
        toast({ open: true, message: '변경사항이 저장되었습니다.', type: 'success' });
      } else toast({ open: true, message: '저장 실패', type: 'error' });
    });
  }

  return (
    <>
      <ContentHeader title="회원 정보 수정" />
      <Box>
        <ProfileImage />
        <TextInput
          type="email"
          label="이메일"
          background="#f4f4f4"
          defaultValue={email}
          disabled
        />
        <TextInput
          type="text"
          label="이름"
          background="#f4f4f4"
          defaultValue={name}
          disabled
        />
        <TextInput
          type="text"
          label="연락처"
          background="#e5f2f8"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          right={<span style={{ fontSize: 14, color: "#007cba" }} onClick={handleClickConfirm}>수정</span>}
        />
        <Button
          style={{ background: "#e5f2f8", color: "#007cba" }}
          onClick={() => navigate("/change_password")}
        >
          비밀번호 변경
        </Button>
      </Box>
    </>
  );
};

export default memo(ProfileEdit);
