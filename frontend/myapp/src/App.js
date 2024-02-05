import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Homecover from './components/Homecover';
import Slider from './components/Slider';
import Footer from './components/Footerdata';
import Login from './components/login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Registration from './components/registration';
import AdminDashboard from './components/Admindashboard';
import Allproducts from './components/Allproducts';
import Getproductdetail from './components/getproductdetail';
import Cart from './components/Cart';
import Address from './components/Address';
//import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import CategoryProducts from './components/CategoryProducts';
import Paypal from './components/Paypal';
import Men from './components/men';
import Kids from './components/Kids';
import Profilepage from './components/Profilepage';


function App() 
{
  return (
    <>
    
  
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Homecover/>}></Route>
      <Route path="/loginuser" element={<Login/>}></Route>
      <Route path="/register" element={<Registration/>}></Route>
     
      <Route path="/allproducts" element={<Allproducts/>}></Route>
      <Route path="/categoryproducts/:category" element={<CategoryProducts/>}></Route>
      <Route path="/men" element={<Men/>}></Route>
      <Route path="/kids" element={<Kids/>}></Route>
      <Route path="/getproductdetail/:id" element={<Getproductdetail/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/profile" element={<Profilepage/>}></Route>
      <Route path="/address/:total" element={<Address/>}></Route>
      <Route path="/paypal/:total" element={<Paypal/>}> </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
      
    </>
  );
}


export default App;
 
