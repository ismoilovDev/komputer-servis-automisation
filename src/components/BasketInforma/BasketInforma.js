import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import http from '../../Services/getData';
import './BasketInforma.css';

const BasketInforma = (props) => {

   const [loaded, setLoaded] = useState(false);
   const [orders, setOrders] = useState([]);
   const [description, setDescription] = useState('');

   useEffect(() => {
      console.log(props?.clickedPostman);
      const getAllBaskets = async () => {
         await http
            .get(`/warehouse-order/?basket_id=${props?.clickedPostman.basket_id}`)
            .then(res => {
               console.log(res.data);
               setOrders(res.data.orders);
               setDescription(res.data.description);
               setLoaded(true);
            })
            .catch(err => {
            })
      }
      getAllBaskets()
   }, // eslint-disable-next-line
      [props?.clickedPostman.basket_id]);

   return (
      <div>
         <Offcanvas show={props.show} onHide={props.handleClose} placement="end" name="end">
            <Offcanvas.Header closeButton>
               <Offcanvas.Title>{props?.clickedPostman?.postman?.full_name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
               <div className='loader'>
                  <img src="./assets/loader.gif" alt='loader' />
               </div>
               {
                  orders.map(order => (
                     <div key={order.product_name} className='product_box'>
                        <div className='product_name'>
                           {order.product_name}
                        </div>
                        <div className='product_count'>
                           {order.count}
                        </div>
                        <div className='product_descripion'>
                           {order.description}
                           <a href={order.qr_link}>Kode</a>
                        </div>
                     </div>
                  ))
               }
            </Offcanvas.Body>
         </Offcanvas>
      </div>
   );
}

export default BasketInforma;
