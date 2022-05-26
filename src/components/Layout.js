import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Drawer from './Drawer/Drawer';
import Main from '../Pages/Main/Main';
import AddBaskets from '../Pages/AddBaskets/AddBaskets';
import AddCategories from '../Pages/AddCategories/AddCategories';
import AddSubCategories from '../Pages/AddSubCategories/AddSubCategories';
import AddDoubleSubCategories from '../Pages/AddDoubleSubCategory/AddDoubleSubCategory';
import AddProducts from '../Pages/AddProducts/AddProducts';
import Categories from '../Pages/Categories/Categories';
import Products from '../Pages/Products/Products';
import Clients from '../Pages/Clients/Clients';
import SelectedProducts from '../Pages/SelectedProducts/SelectedProducts';
import BasketsHistory from '../Pages/BasketsHistory/BasketsHistory';
import Postmans from '../Pages/Postmans/Postmans';

const Layout = () => {
   return (
      <main>
         <Sidebar />
         <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add-baskets" element={<AddBaskets />} />
          <Route path="/add-categories" element={<AddCategories />} />
          <Route path="/add-sub-categories" element={<AddSubCategories />} />
          <Route path="/add-double-sub-categories" element={<AddDoubleSubCategories />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/selected-products/:id" element={<SelectedProducts />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/all-baskets" element={<BasketsHistory />} />
          <Route path="/postmans" element={<Postmans />} />
        </Routes>
        <Drawer />
      </main>
   )
}

export default Layout;