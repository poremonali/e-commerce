import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {API_BASE_URL} from '../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

//component used to display perticular product detail..when user click on name of product
const Getproductdetail=()=>
{
    const {id}=useParams(); // ta take parameters passed using url..
    const [productdata,setProductData]=useState([]);

    const navigate = useNavigate();
    const dispatch=useDispatch();


    const user = useSelector(state => state.userReducer1)
    useEffect((req,res)=>
    {
       
        axios.get(`${API_BASE_URL}/getproductbyid/${id}`)
        .then((responseData)=>
        {
            console.log(responseData.data.resp);
            setProductData(responseData.data.resp);
            console.log(productdata.name);
        })
        .catch((error)=>
        {
            console.log(error);
        })

        
    },[])
    const handleAddItem=(itemtoadd)=>
    {
        console.log(itemtoadd._id);
       dispatch({type:"ADD_ITEM",payload:{id:itemtoadd._id,uid:user.user.userid,name:itemtoadd.name,price:itemtoadd.price,image:itemtoadd.image,quantity:1}})
        console.log("item added to item store");
      //console.log(items);  
      navigate("/cart")
    }
    return(<>
  
    <div className="container-fluid">
        <div className="card shadow" style={{margin:50}}>
            <img className="card-img-top mt-2" src={productdata.image} style={{width:500,height:400,marginLeft:50}}></img>
            <div className="card-body" style={{marginLeft:50}}>
                <h6 className="card-title">
                       {productdata.name}  </h6>
                <span>${productdata.price}</span><br/>
                <span>Free Delivery</span><br/>
                <button className="btn  bg-warning button-style" onClick={(e)=>handleAddItem(productdata)} >
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                    <b>Add to cart</b>
                                </button>

            </div>
        </div>
    </div>
    
    </>);
}
export default Getproductdetail;