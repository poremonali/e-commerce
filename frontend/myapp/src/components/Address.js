import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Address=()=>
{
 
    const navigate=useNavigate();
    const {email,name,userid,isadmin,address}=JSON.parse(localStorage.getItem("user"))
    const {total}=useParams();

    //after confirming address when click on checkout button page redirected to payment page(includes total to be paid also)
    const payment=()=>
    {
        navigate(`/paypal/${total}`)
    }
    
    return(
        <>
       <h6>confirm Address</h6>
       {address}
       <button className="btn btn-primary" onClick={payment}>Checkout</button>
        </>
    )
}
export default Address;