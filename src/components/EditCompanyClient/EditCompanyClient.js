import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField, Paper } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import http from '../../Services/getData';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

function EditCompanyClient({
   selectedClient,
   compClients,
   setCompClients,
   clients,
   setClients,
   setOpen,
   handleClick,
   setSuccess,
   setFrom
}) {

   const [clicked, setClicked] = useState(false)
   const [hasError, setHasError] = useState(false)
   const [phone, setPhone] = useState('');
   const [name, setName] = useState('');

   useEffect(() => {
      setName(selectedClient.full_name);
      setPhone(selectedClient.phone);
   }, // eslint-disable-next-line
      [])


   // Update Client
   const updateClient = (e) => {
      e.preventDefault()
      setClicked(true)
      setHasError(false)
      const data = {
         phone: phone,
         full_name: name
      }
      http
         .patch(`/user/update/${selectedClient.id}`, data)
         .then(res => {
            setClicked(false);

            // Edited Company Clients List
            const editedCompClients = compClients.filter(item => {
               if(item.id === selectedClient.id) {
                  item.phone = phone;
                  item.full_name = name;
               }
               return item;
            })
            setCompClients(editedCompClients)

            // Edited Clients List
            const editedClients = clients.filter(item => {
               if(item.id === selectedClient.id) {
                  item.phone = phone;
                  item.full_name = name;
               }
               return item;
            })
            setClients(editedClients);
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
                           label="Наименование предприятия"
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
                           label="Телефон предприятия"
                           value={phone}
                           onChange={(e) => { setPhone(e.target.value) }}
                           placeholder="+998937077007"
                           required
                        />
                     </FormControl>
                  </Col>
               </Row>
               <Button type="submit" variant="contained" color="primary">
                  {
                     clicked ? <LoadingOutlined className='h6 px-4' /> : "изменить"
                  }
               </Button>
            </Form>
         </Paper>
      </div>
   )
}

export default EditCompanyClient