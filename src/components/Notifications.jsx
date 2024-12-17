import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { call, answerCall, callAccepted } = useContext(SocketContext);

  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" gutterBottom>{call.name} is calling...</Typography>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
