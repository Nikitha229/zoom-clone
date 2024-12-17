import React, { useContext, useEffect, useRef } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  // Local refs for the video elements
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);

  // Attach the stream to the `myVideo` element when it is available
  useEffect(() => {
    if (stream && myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  }, [stream]); // Re-run when `stream` changes

  // Synchronize context refs (`myVideo` and `userVideo`) with local refs
  useEffect(() => {
    if (myVideo) {
      myVideo.current = myVideoRef.current; // Assign local ref to context ref
    }
    if (userVideo) {
      userVideo.current = userVideoRef.current; // Assign local ref to context ref
    }
  }, [myVideo, userVideo]); // Run whenever `myVideo` or `userVideo` changes

  return (
    <Grid container justifyContent="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      {/* My Video */}
      {stream && (
        <Paper
          elevation={3}
          sx={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {name || 'Your Name'}
          </Typography>
          <Box
            component="video"
            playsInline
            muted
            ref={myVideoRef} // Attach local ref here
            autoPlay
            sx={{
              width: { xs: '300px', sm: '550px' },
            }}
          />
        </Paper>
      )}

      {/* User's Video */}
      {callAccepted && !callEnded && (
        <Paper
          elevation={3}
          sx={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {call.name || 'Caller Name'}
          </Typography>
          <Box
            component="video"
            playsInline
            ref={userVideoRef} // Attach local ref here
            autoPlay
            sx={{
              width: { xs: '300px', sm: '550px' },
            }}
          />
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
