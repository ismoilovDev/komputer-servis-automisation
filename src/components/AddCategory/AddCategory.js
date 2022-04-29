import React from 'react';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import { TextField } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';

function AddCategory(
   {
      name,
      setName,
      minPrecent,
      setMinPercent,
      maxPercent,
      setMaxPercent,
      wholesale,
      setWholesale,
      addCategory
   }) {

   return (
      <>
         <div className='px-4'>
            <Form onSubmit={(e) => addCategory(e)} autoComplete="off">
               <Row>
                  <Col xs="12" md="6" className='my-1'>
                     <FormControl className='w-100'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="text"
                           id="tavar"
                           variant="standard"
                           label="Название категории"
                           value={name}
                           onChange={(e) => { setName(e.target.value) }}
                           placeholder="Компьютеры"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6" className='my-1'>
                     <FormControl className='w-100'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           variant="standard"
                           label="Optom %"
                           value={wholesale}
                           onChange={(e) => { setWholesale(e.target.value) }}
                           placeholder="20"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6" className='my-1'>
                     <FormControl className='w-100'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           variant="standard"
                           label="Min %"
                           value={minPrecent}
                           onChange={(e) => { setMinPercent(e.target.value) }}
                           placeholder="15"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6" className='my-1'>
                     <FormControl className='w-100'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           variant="standard"
                           label="Max %"
                           value={maxPercent}
                           onChange={(e) => { setMaxPercent(e.target.value) }}
                           placeholder="25"
                           required
                        />
                     </FormControl>
                  </Col>
               </Row>
               <Row className='w-100 justify-content-start m-0 p-0 mt-2'>
                  <Col xs="6" md="4" className='w-100 d-flex justify-content-start m-0 p-0'>
                     <Button type="submit" variant="contained" color="primary">
                        добавить
                     </Button>
                  </Col>
               </Row>
            </Form>
         </div>
      </>
   )
}

export default AddCategory;
