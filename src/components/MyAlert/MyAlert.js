import React from 'react'
import { Alert, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { flexbox } from '@mui/system';

const useStyles = makeStyles({
   snack: {
      borderRadius: 5,
      display: flexbox,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 300,
      minHeight: 70,
      padding: '6px 15px',
      transition: '.3s',
   }
});
function MyAlert({ success, notific, handleClose, errorMessage, successMessage, emptyMessage }) {
   const classes = useStyles();
   return (
      <Snackbar
         className={classes.snack}
         open={notific}
         autoHideDuration={4000}
         onClose={handleClose}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
         }}>
         <Alert className={classes.snack} onClose={handleClose} variant="filled" severity={success ? "success": "error"}>
            {
               success ? (success ? successMessage : errorMessage) : emptyMessage
            }
         </Alert>
      </Snackbar>
   )
}

export default MyAlert