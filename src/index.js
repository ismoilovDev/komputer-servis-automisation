import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import Routing from './Routing';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <React.StrictMode>
  //   <Routing />
  // </React.StrictMode>,
  <Routing />,
  document.getElementById('root')
);

reportWebVitals();
