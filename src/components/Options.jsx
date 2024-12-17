import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material'; // Updated import
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'; // Updated import
import { makeStyles } from '@mui/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState(''); // The ID to call
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className={classes.margin}>
              {/* Copying the socket ID */}
              <CopyToClipboard text={me || ''}>
                <Button variant="contained" color="primary" fullWidth onClick={()=>console.log({me})}>
                  <Assignment fontSize="large" />
                  Copy ID
                </Button>
              </CopyToClipboard>
            </Grid>

            {/* Calling another user */}
            {!callAccepted && !callEnded && (
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  label="ID to Call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    if (idToCall) {
                      callUser(idToCall); // Start call to the copied ID
                    }
                  }}
                >
                  <Phone fontSize="large" />
                  Call
                </Button>
              </Grid>
            )}

            {/* Call accepted */}
            {callAccepted && !callEnded && (
              <Grid item xs={12} className={classes.margin}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={leaveCall}
                >
                  <PhoneDisabled fontSize="large" />
                  End Call
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Options;
