import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Drawer from './components/Drawer/Drawer';
import AddBaskets from './Pages/AddBaskets/AddBaskets';
import AddCategories from './Pages/AddCategories/AddCategories';
import AddSubCategories from './Pages/AddSubCategories/AddSubCategories';
import AddDoubleSubCategories from './Pages/AddDoubleSubCategory/AddDoubleSubCategory';
import AddProducts from './Pages/AddProducts/AddProducts';
import Categories from './Pages/Categories/Categories';
import Products from './Pages/Products/Products'
import Login from './Pages/Login/Login';
import Clients from './Pages/Clients/Clients';
import SelectedProducts from './Pages/SelectedProducts/SelectedProducts';
import BasketsHistory from './Pages/BasketsHistory/BasketsHistory';
import Main from './Pages/Main/Main';
import Postmans from './Pages/Postmans/Postmans';


function Routing() {
  const [token, setToken] = useState(window.localStorage.getItem('servis_token'));
  if (!token) {
    return <Login exact path="/" setToken={setToken} />
  }
  return (
    <div>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Main setToken={setToken} />
          </Route>
          <Route path="/add-baskets">
            <AddBaskets setToken={setToken} />
          </Route>
          <Route path="/add-categories">
            <AddCategories />
          </Route>
          <Route path="/add-sub-categories">
            <AddSubCategories />
          </Route>
          <Route path="/add-double-sub-categories">
            <AddDoubleSubCategories />
          </Route>
          <Route path="/add-products">
            <AddProducts />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/selected-products/:id" component={SelectedProducts} />
          <Route path="/clients">
            <Clients />
          </Route>
          <Route path="/all-baskets">
            <BasketsHistory />
          </Route>
          <Route path="/postmans">
            <Postmans />
          </Route>
        </Switch>
        <Drawer />
      </Router>

    </div>
  );
}

export default Routing;
