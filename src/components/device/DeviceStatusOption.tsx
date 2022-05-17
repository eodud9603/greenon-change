import React from "react";
import { Button as MuiButton } from "@mui/material";
import { DeviceType } from "../../recoil/device";

interface Props {
  text: string;
  active: boolean;
  noPower?: boolean;
  onClick: () => void
}
const DeviceStatusOption = ({
  active,
  noPower = false,
  text,
  onClick
}: Props) => {
  // const { device } = useStore();

  return (
    <MuiButton
      {...(active && { className: 'active' })}
      onClick={onClick}
      disabled={noPower}
    >
      {text}
    </MuiButton>
  );
};

export default DeviceStatusOption;
