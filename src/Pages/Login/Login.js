import React, { useState } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { notification } from 'antd';
import { AiFillCheckCircle } from "react-icons/ai";
import PasswordField from 'material-ui-password-field';
import './Login.css';
import http from "../../Services/getData";
import { Form } from "react-bootstrap";
import { LoadingOutlined } from '@ant-design/icons';

const openNotification = () => {
   notification.open({
      message: 'Успешное введение',
      icon: <AiFillCheckCircle style={{ color: '#3f51b5' }} />,
      placement: 'buttonRight'
   });
};

const Signin = ({ setToken }) => {
   const [password, setPassword] = useState("");
   const [open, setOpen] = useState(false);
   const [clicked, setClicked] = useState(false)

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   function authoHendle(e) {
      e.preventDefault();
      setClicked(true)
      const data = {
         pincode: password,
      }
      http
         .post("/login", data)
         .then(res => {
            console.log(res.data.token);
            window.localStorage.setItem('servis_token', res.data.token);
            setToken(res.data.token);
            setClicked(false);
            window.location.reload(false);
            openNotification();
         })
         .catch(err => {
            handleClick();
            setClicked(false);
         })
   }
   return (
      <div className="login">
         <div className="login_form">
            <Card>
               <CardContent>
                  <Form onSubmit={authoHendle}>
                     <PasswordField
                        className="mt-2"
                        id="password"
                        label="PIN CODE"
                        variant="standard"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                     <Button className="mt-3" type="submit" variant="contained" fullWidth color="primary">
                        {
                           clicked ? <LoadingOutlined className='h6 px-4' /> : "Login"
                        }
                     </Button>
                  </Form>
               </CardContent>
            </Card>
         </div>
         <Snackbar open={open} autohideduration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} autohideduration={6000} severity="error">
               Неудачная попытка!
            </Alert>
         </Snackbar>
      </div>
   );
};

export default Signin;
