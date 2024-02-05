import React, { useEffect, useState } from "react";
import './header.css'
import logo from './images/kalanidhi.jpg'
import { Link, Navigate } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./Admindashboard";
import axios from "axios";
import { API_BASE_URL } from "../config";
const Header = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const products=useSelector(state=>state.itemreducer.items)
    const[totalproducts,setTotalProducts]=useState(0);
    const [admindata,setAdmindata]=useState(false);

  
    function logoutuser()
    {    //when user log out remove localStorage items and clear cart also and setadminto false and navogate to login page..

        //if admindata is true then displaying admin dashboard..
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cartitems")
        setAdmindata(false);
        dispatch({ type: "LOGIN_ERROR" });
        dispatch({type:'CLEAR_CART'})
      
        navigate('/loginuser')
    }
    useEffect(()=>
    {

        if(JSON.parse( localStorage.getItem("user")))
        {
            const{email,address,isadmin,userid}=JSON.parse( localStorage.getItem("user"));
            setAdmindata(isadmin); //when page loads set admindata from taking value from localstorage so to decide weather to display admin dashboard or not
        }
        setTotalProducts(products.length) //to maintain state of cart length(number of products in cart)
    })
    const items=useSelector(state=>state.itemreducer.items);

   
    const selectcategory=(category)=>
    {
       // navigate('/categoryproducts');
       console.log("hi");
       navigate(`/categoryproducts/${category}`)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row marque_row">
                <marquee>!Beaware of impoter sites</marquee>  
                </div>
            </div>

            <div className="header_section">

                <nav className="navbar navbar-expand-sm navbar_expand">
                    <div>
                        <img className="image_header" src={logo} />
                        <button className="navbar-toggler tog_nav"  type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>


                    <div className="collapse navbar-collapse coll_nav" id="collapsibleNavbar" >
                        <ul className="navbar-nav">
                            <li className="nav-item listitem"  >
                                <div className="input-group">
                                    <input type="search" className="form-control" placeholder="kurta,dress,t-shirt etc" />
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary" type="button">

                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div>
                            </li>

                            
                          {localStorage.getItem("user") ?<> <li className="nav-item list_itemm">                               <Link className="btn btn-warning mt-1 " onClick={logoutuser} to="/loginuser" >LogOut</Link>
                            </li>
                            <li className="nav-item list_itemm">
                            <Link className="btn btn-warning mt-1 " to="/profile"  >Profile</Link>
                        </li></>

                            :<li className="nav-item list_itemm">
                                <Link className="btn btn-warning mt-1 " to="/loginuser">Login</Link>
                            </li>
                          }
                            <li>
                               <span> {totalproducts}</span>
                                <Link to="/cart" > <i className="fa-solid fa-cart-shopping fa-lg cartshopping text-dark   "></i></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="second_nav">

                <nav className="navbar navbar-expand ">
                    <ul className="navbar-nav second_ul">

                        <li><Link className="nav-link" to="/"><b>Home</b></Link></li>
                        <li><Link className="nav-link" to="/allproducts"><b>AllProducts</b></Link></li>
                        <li><Link className="nav-link"  to="/categoryproducts/women"><b>women</b></Link></li>
                        <li><Link className="nav-link" to="/men"><b>men</b></Link></li>
                        <li ><Link className="nav-link" to="/kids"> <b> kids </b> </Link></li>
                        

                    </ul>
                </nav >
            </div>
      {  admindata? <AdminDashboard/>:''}
        </>
    );
}
export default Header;