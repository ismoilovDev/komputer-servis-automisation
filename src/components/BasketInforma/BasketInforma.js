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
      setLoaded(false)
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
               {
                  !  loaded ? (
                     <div className={!loaded ? "loader" : "loader hide"}>
                        <img src="./assets/loader.gif" alt='loader' />
                     </div>
                  ) : (
                     <>
                        {
                           orders.map(order => (
                              <div key={order.product_name} className='product_box'>
                                 <div className='product_name'>
                                    <span>Name:</span>
                                    <p>
                                       {order.product_name}
                                    </p>
                                 </div>
                                 <div className='product_count'>
                                    <span>Count:</span>
                                    <p>
                                       {order.count}
                                    </p>
                                 </div>
                              </div>
                           ))
                        }
                     </>
                  )
               }
            </Offcanvas.Body>
         </Offcanvas>
      </div>
   );
}

export default BasketInforma;