import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import { Button, Division, TextInput } from "../components/common";
import { apis } from "../lib/axios";
import UserState from "../recoil/user";
import CryptoJS from 'crypto-js';
import ToastState from "../recoil/toast";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
  }
`;

const ChangePassword = () => {
  const user = useRecoilValue(UserState);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const toast = useSetRecoilState(ToastState);

  const navigate = useNavigate();

  const handleClickConfirm = async () => {
    if (!password || !newPassword || !newPasswordCheck)
      return toast({ open: true, message: '입력되지 않은 항목이 있습니다.', type: 'error' });
    if (password === newPassword)
      return toast({ open: true, message: '동일한 비밀번호로 변경할 수 없습니다.', type: 'error' });

    let hashedPassword = password;
    for (let i = 0; i < 50; i++) {
      hashedPassword = CryptoJS.SHA512(hashedPassword + process.env.REACT_APP_HASH_SALT).toString();
    }

    const verify = await apis.verifyPassword(user.id, hashedPassword);
    
    if (verify.status === 200 && verify.data.result) {
      let hashedNewPassword = newPassword;
      for (let i = 0; i < 50; i++) {
        hashedNewPassword = CryptoJS.SHA512(hashedNewPassword + process.env.REACT_APP_HASH_SALT).toString();
      }
      const update = await apis.updateUserInfo(user.id, { password: hashedNewPassword });

      if (update.status === 200 && update.data.isSuccess && update.data.affected === 1) {
        toast({ open: true, message: '비밀번호가 변경되었습니다.', type: 'success' });
        navigate(-1);
      } else toast({ open: true, message: '비밀번호 변경에 실패했습니다.', type: 'error' });

    } else {
      toast({ open: true, message: '비밀번호가 올바르지 않습니다.', type: 'error' });
    }
  }
  return (
    <>
      <ContentHeader title="비밀번호 변경" />
      <Box>
        <TextInput type="password" label="기존 비밀번호 입력" value={password} onChange={e => setPassword(e.target.value)} />
        <Division />
        <TextInput type="password" label="새 비밀번호 입력" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        <TextInput type="password" label="새 비밀번호 확인" value={newPasswordCheck} onChange={e => setNewPasswordCheck(e.target.value)} />

        <Button onClick={handleClickConfirm}>확인</Button>
      </Box>
    </>
  );
};

export default ChangePassword;
