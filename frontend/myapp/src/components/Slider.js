import React, { useEffect,useState } from "react";
import './homecover1.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import axios from "axios";
import {API_BASE_URL} from '../../src/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
//Carousal is created here ..
const Slider =()=>
{
    const [finaliList, setFinalList] = useState([]);    
    
    const user = useSelector(state => state.userReducer1)
    const items=useSelector(state=>state.itemreducer.items);

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const options={
        items:1,
        loop:true,
        autoplay:true,autoplayTimeout:4000,
        nav:false,
        margin:0,
        responsive:{
            1100:
            {
                items:4,
            },
            724:
            {
                items:3,
            },
            500:
            {
                items:2,
            },
            370:
            {
                items:1,
            }
        }
    }        
    function fetchData()
    {
        //when page loads take products from database and set to finalList so that can be used later to display ..
        axios.get(`${API_BASE_URL}/getallproducts`)
        .then((result)=>
        {
            console.log(result.data.Allproducts);
            setFinalList(result.data.Allproducts)
            //console.log(finaliList[0]);
        })
        .catch((error)=>
        {
            console.log(error);
        })
    }
        useEffect(()=>
        {
            fetchData();
        },[])

        //when user click on add to cart button this function is called to add that product in redux global store usind dispatch method
        const handleAddItem=(itemtoadd)=>
        {
            console.log(itemtoadd._id);
           dispatch({type:"ADD_ITEM",payload:{id:itemtoadd._id,uid:user.user.userid,name:itemtoadd.name,price:itemtoadd.price,image:itemtoadd.image,quantity:1}})
            console.log("item added to item store");
          console.log(items);  
          navigate("/cart") //page is redirected to cart page..
        }
    return(
        <>
        <h3 className="text-center">Featured Products</h3>
        <OwlCarousel className='owl-theme' {...options}>
            {
        finaliList.map((items)=>
        
        <div className='item'>
            
            <div className="card m-2">
                <img class="card-img-top image"  src={items.image} alt="tshirt"/>

                <div className="card-title">
                    <h6 >{items.name}</h6>
                </div>
                <div className="card-body card_body" >
                    <p><b>${items.price}</b><br/>{items.name}</p>
                    <button className="btn bg-warning" onClick={()=>handleAddItem(items)} >
                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                        <b>Add to cart</b>
                    </button>
                </div>

            </div>
        </div>
        )
            }
    </OwlCarousel>
    </>
    );
}

export default Slider;