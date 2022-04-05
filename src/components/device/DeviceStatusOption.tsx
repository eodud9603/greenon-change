import React from "react";
import { Button as MuiButton } from "@mui/material";
import { DeviceType } from "../../recoil/device";

interface Props {
  text: string;
  active: boolean;
  onClick: () => void
}
const DeviceStatusOption = ({
  active,
  text,
  onClick
}: Props) => {
  // const { device } = useStore();

  return (
    <MuiButton
      {...(active && { className: 'active' })}
      onClick={onClick}
    >
      {text}
    </MuiButton>
  );
};

export default DeviceStatusOption;
