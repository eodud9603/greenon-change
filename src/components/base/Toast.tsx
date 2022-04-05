import React, { useState, useEffect } from "react";
import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";
import { useRecoilState } from 'recoil';
import ToastState from "../../recoil/toast";

const Toast = () => {
  const [toast, setToast] = useRecoilState(ToastState);
  const [origin, setOrigin] = useState<SnackbarOrigin>({
    vertical: "bottom",
    horizontal: "right"
  });

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setOrigin({ vertical: "top", horizontal: "center" });
    } else {
      setOrigin({ vertical: "bottom", horizontal: "right" });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Snackbar
      open={toast.open}
      anchorOrigin={{
        vertical: origin.vertical,
        horizontal: origin.horizontal,
      }}
      autoHideDuration={3000}
      onClose={() => setToast({ ...toast, open: false })}
    >
      <Alert severity={toast.type}>{toast.message}</Alert>
    </Snackbar>
  );
};

export default Toast;
