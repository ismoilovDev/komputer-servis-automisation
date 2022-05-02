import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Tabs } from 'antd';
import { Button, FormControl, TextField } from '@mui/material';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import http from '../../Services/getData';
import NumberFormat from 'react-number-format';
import './Drawer.css';




export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
   // Yurudik
   const [phone, setPhone] = useState('');
   const [name, setName] = useState('');
   const [inn, setInn] = useState('');
   const [discription, setDiscription] = useState('');
   // Jismoniy
   const [jisPhone, setJisPhone] = useState('');
   const [jisName, setJisName] = useState('');
   const [jisDescription, setJisDescription] = useState('');
   const [open, setOpen] = useState(false);
   const [notific, setNotific] = useState(false);
   const [notificRes, setNotificRes] = useState(false);
   const innInput = useRef(null)
   const [isError, setIsError] = useState(false);
   const { TabPane } = Tabs;
   // Error
   const handleClick = () => {
      setNotific(true);
   };

   // Response
   const handleClickRes = () => {
      setNotificRes(true);
   };

   // Backdrop
   const handleClose = (reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setNotific(false);
      setNotificRes(false);
      setOpen(false);
   };

   const handleOpen = () => {
      setOpen(true);
   };

   // Yurudik
   const postHendleYurudik = (e) => {
      e.preventDefault();
      setIsError(false);
      if (inn.length === 14) {
         handleOpen();
         setNotific(false);
         setNotificRes(false);
         const data = {
            status: "Y",
            phone: phone,
            full_name: name,
            inn: inn,
            description: discription
         }
         http
            .post('/user/create', data)
            .then(res => {
               console.log(res.data.data);
               setName('');
               setDiscription('');
               setInn('');
               setPhone('');
               handleClose();
               handleClickRes();
            })
            .catch(err => {
               setName('');
               setDiscription('');
               setInn('');
               setPhone('');
               handleClose();
               handleClick();
               console.log(err)
            })
      } else {
         setIsError(true)
      }
   }

   // Jismoniy
   const postHendleJismoniy = (e) => {
      e.preventDefault();
      handleOpen();
      setNotific(false);
      setNotificRes(false);
      const data = {
         status: "J",
         phone: jisPhone,
         full_name: jisName,
         description: jisDescription
      }
      http
         .post('/user/create', data)
         .then(res => {
            console.log(res.data.data);
            setJisName('');
            setJisDescription('');
            setJisPhone('');
            handleClose();
            handleClickRes();
         })
         .catch(err => {
            console.log(err);
            setJisName('');
            setJisDescription('');
            setJisPhone('');
            handleClose();
            handleClick();
         })
   }

   // Postman
   const postHendlePostman = (e) => {
      e.preventDefault();
      setIsError(false);
      if (inn.length === 14) {
         handleOpen();
         setNotific(false);
         setNotificRes(false);
         const data = {
            phone: phone,
            full_name: name,
            inn: inn,
            description: discription
         }
         http
            .post('/postman/create', data)
            .then(res => {
               console.log(res.data.data);
               setName('');
               setDiscription('');
               setInn('');
               setPhone('');
               handleClose();
               handleClickRes();
            })
            .catch(err => {
               setName('');
               setDiscription('');
               setInn('');
               setPhone('');
               handleClose();
               handleClick();
               console.log(err)
            })
      } else {
         setIsError(true)
      }
   }

   // Cheack Length 
   const innChanged = (innVal) => {
      if(innVal.length > 14) {
         setInn(innVal);
         setIsError(true);
      }
      else {
         setInn(innVal);
         setIsError(false);
      }
   }

   return (
      <div>
         <React.Fragment>
            <Drawer
               anchor="right"
               open={state}
               onClose={toggleDrawer}
            >
               <Box
                  role="presentation"
                  className='px-2'
               >
                  <Tabs defaultActiveKey="1">
                     {/* Yurudik */}
                     <TabPane tab="Юрид" key="1">
                        <div className='px-2'>
                           <Form onSubmit={postHendleYurudik} autoComplete="off" >
                              <FormControl className='w-100 my-2'>
                                 <TextField
                                    size="small"
                                    className="w-100 for-label mb-3"
                                    type="text"
                                    id="firma_name"
                                    variant="standard"
                                    label="Наименование предприятия"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    placeholder="TexnoPos"
                                    required
                                 />
                              </FormControl>
                              <FormControl className='w-100'>
                                 <TextField
                                    ref={innInput}
                                    size="small"
                                    className="w-100 for-label mb-3"
                                    type="number"
                                    id="inn"
                                    label="ИНН предприятия(STIR)"
                                    variant="standard"
                                    value={inn}
                                    onChange={e => innChanged(e.target.value)}
                                    placeholder="18975656965845"
                                    required
                                    error={isError}
                                    helperText={isError ? "Должно быть 14 цифр" : ""}
                                 />
                              </FormControl>
                              <FormControl className='w-100 my-2'>
                                 <NumberFormat
                                    customInput={TextField}
                                    variant='standard'
                                    format="+998(##)###-##-##"
                                    id="tele_num"
                                    label="Номер телефона"
                                    mask={"_"}
                                    onValueChange={e => {
                                       setPhone(e.formattedValue)
                                    }}
                                    placeholder="+998(90)662-16-02"
                                    required
                                    value={phone}
                                 />
                              </FormControl>
                              <FloatingLabel className='my-2' controlId="floatingTextarea2" label="Дополнительная Информация">
                                 <Form.Control
                                    as="textarea"
                                    placeholder="Новое предприятие"
                                    style={{ height: '100px' }}
                                    value={discription}
                                    onChange={(e) => { setDiscription(e.target.value) }}
                                 />
                              </FloatingLabel>
                              <Button type="submit" variant="contained" color="primary">
                                 добавить
                              </Button>
                           </Form>
                        </div>
                     </TabPane>

                     {/* Jismoniy */}
                     <TabPane tab="Физические" key="2">
                        <div className='px-2'>
                           <Form onSubmit={postHendleJismoniy} autoComplete='off'>
                              <FormControl className='w-100 my-2'>
                                 <TextField
                                    size="small"
                                    className="w-100 for-label mb-3"
                                    type="text"
                                    id="jis_name"
                                    variant="standard"
                                    label="Имя"
                                    value={jisName}
                                    onChange={(e) => { setJisName(e.target.value) }}
                                    placeholder="Исмаилов Аббас"
                                    required
                                 />
                              </FormControl>
                              <FormControl className='w-100 my-2'>
                                 <NumberFormat
                                    customInput={TextField}
                                    variant='standard'
                                    format="+998(##)###-##-##"
                                    id="jis_phone"
                                    label="Номер телефона"
                                    mask={"_"}
                                    onValueChange={e => {
                                       setJisPhone(e.formattedValue)
                                    }}
                                    placeholder="+998(90)662-16-02"
                                    required
                                    value={jisPhone}
                                 />
                              </FormControl>
                              <FloatingLabel className='my-2' controlId="floatingTextarea2" label="Дополнительная Информация">
                                 <Form.Control
                                    as="textarea"
                                    placeholder="Новый клиент"
                                    style={{ height: '100px' }}
                                    value={jisDescription}
                                    onChange={(e) => { setJisDescription(e.target.value) }}
                                 />
                              </FloatingLabel>
                              <Button type="submit" variant="contained" color="primary">
                                 добавить
                              </Button>
                           </Form>
                        </div>
                     </TabPane>

                     {/* Postman */}
                     <TabPane tab="Поставщик" key="3">
                        <div className='px-2'>
                           <Form onSubmit={postHendlePostman} autoComplete='off'>
                              <FormControl className='w-100 my-2'>
                                 <TextField
                                    size="small"
                                    className="w-100 for-label mb-3"
                                    type="text"
                                    id="firma_name"
                                    variant="standard"
                                    label="Наименование поставщик"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    placeholder="Chopar MCHJ"
                                    required
                                 />
                              </FormControl>
                              <FormControl className='w-100'>
                                 <TextField
                                    size="small"
                                    className="w-100 for-label mb-3"
                                    type="number"
                                    id="inn"
                                    variant="standard"
                                    label="ИНН оставщик(STIR)"
                                    value={inn}
                                    onChange={(e) => { innChanged(e.target.value) }}
                                    placeholder="18975656965284"
                                    required
                                    error={isError}
                                    helperText={isError ? "Должно быть 14 цифр" : ""}
                                 />
                              </FormControl>
                              <FormControl className='w-100 my-2'>
                                 <NumberFormat
                                    customInput={TextField}
                                    variant='standard'
                                    format="+998(##)###-##-##"
                                    id="tele_num"
                                    label="Номер телефона"
                                    mask={"_"}
                                    onValueChange={e => {
                                       setPhone(e.formattedValue)
                                    }}
                                    placeholder="+998(90)662-16-02"
                                    required
                                    value={phone}
                                 />
                                 
                              </FormControl>
                              <FloatingLabel className='my-2' controlId="floatingTextarea2" label="Дополнительная Информация">
                                 <Form.Control
                                    as="textarea"
                                    placeholder="Новый почтальон"
                                    style={{ height: '100px' }}
                                    value={discription}
                                    onChange={(e) => { setDiscription(e.target.value) }}
                                 />
                              </FloatingLabel>
                              <Button type="submit" variant="contained" color="primary">
                                 добавить
                              </Button>
                           </Form>
                        </div>
                     </TabPane>
                  </Tabs>
               </Box>
               <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                  open={open}
               >
                  <CircularProgress color="inherit" />
               </Backdrop>
               <Snackbar
                  open={notific}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right'
                  }}>
                  <Alert onClose={handleClose} variant="filled" severity="error">
                     Неудачная реализация
                  </Alert>
               </Snackbar>
               <Snackbar
                  open={notificRes}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right'
                  }}>
                  <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                     Успешно реализовано
                  </Alert>
               </Snackbar>
            </Drawer>
         </React.Fragment>
      </div>
   );
}