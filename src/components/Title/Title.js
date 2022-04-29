import React from 'react';
import './Title.css';

const Title = (props) => {
   return (
      <div className='title'>
         <div className='title-box'>
            {props.children}
         </div>
         <div className='title-text'>
            <h3>{props.title}</h3>
            <span>Example layout page for forum listing</span>
         </div>
      </div>
   );
}

export default Title;
