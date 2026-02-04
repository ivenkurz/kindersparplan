"use client";

import Alert from "@mui/material/Alert";

interface ValidationAlertProps {
  message: string;
}

export default function ValidationAlert({ message }: ValidationAlertProps) {
  return (
    <Alert
      severity="warning"
      sx={{
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "rgba(253, 143, 24, 0.8)",
        backgroundColor: "rgba(253, 209, 162, 0.5)",
        color: "#8a551d",
        fontWeight: 500,
        "& .MuiAlert-icon": { color: "#8a551d" },
      }}
    >
      {message}
    </Alert>
  );
}
