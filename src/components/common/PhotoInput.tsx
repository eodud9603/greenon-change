import React, { useState } from "react";
import styled from "styled-components";
import { InputTemplate } from ".";
import { ReactComponent as CameraIcon } from "../../static/icons/icon-camera.svg";

interface PhotoInputProps {
  label: string;
  name?: string;
  onChange: any;
}

const PhotoBox = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background: rgb(229, 242, 248);
  border: 1px solid rgb(177, 202, 214);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
`;

const Preview = styled.img`
  width: 100%;
`;

const PhotoInput = ({ label, name, onChange }: PhotoInputProps) => {
  const [image, setImage] = useState<any>();

  const handleOnChange = (e: any) => {
    onChange(e);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <InputTemplate label={label}>
      <input
        id="image-input"
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        name={name}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <PhotoBox htmlFor="image-input">
        {image ? <Preview src={image} /> : <CameraIcon />}
      </PhotoBox>
    </InputTemplate>
  );
};

export default PhotoInput;
