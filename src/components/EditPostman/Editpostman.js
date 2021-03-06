import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField, Paper } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import http from '../../Services/getData';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

function EditPostman({
   selectedPostman,
   postmans,
   setPostmans,
   setOpen,
   handleClick,
   setSuccess,
   setFrom
}) {
   const [clicked, setClicked] = useState(false)
   const [hasError, setHasError] = useState(false)
   const [phone, setPhone] = useState('');
   const [name, setName] = useState('');
   const [inn, setInn] = useState('');
   const [descpr, setDescpr] = useState('');

   useEffect(() => {
      setName(selectedPostman.full_name);
      setPhone(selectedPostman.phone);
      setInn(selectedPostman.inn);
      setDescpr(selectedPostman.description);
   }, // eslint-disable-next-line
      [])


   // Update Client
   const updateClient = (e) => {
      e.preventDefault()
      setClicked(true)
      setHasError(false)
      const data = {
         phone: phone,
         full_name: name,
         inn: inn,
         description: descpr
      }
      http
         .put(`/postman/update/${selectedPostman.id}`, data)
         .then(res => {
            setClicked(false);

            // Edited Company Clients List
            const allPostmans = postmans.filter(item => {
               if(item.id === selectedPostman.id) {
                  item.phone = phone;
                  item.full_name = name;
                  item.inn = inn;
                  item.description = descpr;
               }
               return item;
            })
            setPostmans(allPostmans)
            setOpen(false);
            setFrom('update');
            setSuccess(true);
            handleClick();
         })
         .catch(err => {
            setClicked(false);
            setHasError(true);
            setFrom('update');
            setSuccess(false);
         })
   }
   return (
      <div>
         <Paper elevation={2} className="p-xs-2 p-4">
            {
               hasError ? <Alert message="Error" type="error" showIcon closable  /> : null
            }
            <Form onSubmit={updateClient} autoComplete="off">
               <Row>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="text"
                           id="firma_name"
                           variant="standard"
                           label="???????????????????????? ??????????????????????"
                           value={name}
                           onChange={(e) => { setName(e.target.value) }}
                           placeholder="TexnoPos"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="tel"
                           id="firma_phone"
                           variant="standard"
                           label="?????????????? ??????????????????????"
                           value={phone}
                           onChange={(e) => { setPhone(e.target.value) }}
                           placeholder="+998937077007"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="text"
                           id="firma_inn"
                           variant="standard"
                           label="INN"
                           value={inn}
                           onChange={(e) => { setInn(e.target.value) }}
                           placeholder="245837077007"
                           required
                        />
                     </FormControl>
                  </Col>
               </Row>
               <Button type="submit" variant="contained" color="primary">
                  {
                     clicked ? <LoadingOutlined className='h6 px-4' /> : "????????????????"
                  }
               </Button>
            </Form>
         </Paper>
      </div>
   )
}

export default EditPostman