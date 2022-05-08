import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProgressBar from '../../components/ChartBox/ProgressChart/ChartBox';
import Title from '../../components/Title/Title';
import http from '../../Services/getData';
import { IoLayersOutline } from 'react-icons/io5';
import LineAnalys from '../../components/ChartBox/LineChart/ChartBox';

const MainContent = ({ setToken }) => {

   useEffect(() => {
      const getAllProducts = async () => {
         await http
            .get('/product/all')
            .then(res => {

            })
            .catch(err => {
               console.log(err.response)
               if (err.response.data.message === "Unauthenticated." || err.response.status === 401) {
                  window.localStorage.clear()
                  setToken("")
                  window.location.reload(false);
               }
            })
      }
      getAllProducts()

   },  // eslint-disable-next-line 
      [])

   return (
      <div className='main px-2 px-md-3'>
         <Container>
            <Title
               title="Панель управления"
               children={<IoLayersOutline />}
            />
            <ProgressBar />
            <Row>
               <LineAnalys />
            </Row>
         </Container>
      </div>
   )
};
export default MainContent;