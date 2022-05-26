import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Layout from './components/Layout';


function Routing() {
  const [token, setToken] = useState(window.localStorage.getItem('servis_token'));
  if (!token) {
    return <Login exact path="/" setToken={setToken} />
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      {/* <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main setToken={setToken} />} />
          <Route path="/add-baskets" element={<AddBaskets setToken={setToken} />} />
          <Route path="/add-categories" element={<AddCategories />} />
          <Route path="/add-sub-categories" element={<AddSubCategories />} />
          <Route path="/add-double-sub-categories" element={<AddDoubleSubCategories />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/selected-products/:id" element={<SelectedProducts />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/all-baskets" element={<BasketsHistory />} />
          <Route path="/postmans" element={<Postmans} />
        </Routes>
        <Drawer />
      </Router> */}

    </div>
  );
}

export default Routing;
