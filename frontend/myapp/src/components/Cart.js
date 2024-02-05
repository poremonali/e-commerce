import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import './cartpage.css'
import { useNavigate } from "react-router-dom";

const Cart=()=>
{
    const items=useSelector(state=>state.itemreducer.items);
    const user=useSelector(state=>state.userReducer1)

    const [finaliList,setfinalList]=useState([]);
    
    const [total,setTotal]=useState(0);

    const [quantity,setQuantity]=useState('');
   
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>
    {
        localStorage.setItem("cartitems",JSON.stringify(items));
        if(localStorage.getItem("user"))
        {
            
        }
        else
        {
            //if localstorage.getItem("user") is not available means user is logged out so we clear cart..
            dispatch({type:'CLEAR_CART'})
            setTotal(0)
        }
        console.log(items.length);
    //doing total all products in cart considering there quantity also...And  this is doing in useEffect so cart value is updated correctly on changes
        var total1=0;
       for(let i=0;i<items.length;i++)
        {
            total1=(items[i].price*items[i].quantity)+total1;

            setTotal(total1); //state of total is maintained ..
        }
        
    })
    
    const handleAddItem=(itemtoadd)=>
    {
        //incrementing quantity of product..product data send to redux store and functionality required has done there by checking all conditions..
        console.log(itemtoadd.id);
       dispatch({type:"ADD_ITEM",payload:{id:itemtoadd.id,uid:user.user.userid,name:itemtoadd.name,price:itemtoadd.price,image:itemtoadd.image,quantity:1}})
        console.log("item added to item store");
      console.log(items);  

    }

    const removecartitem=(itemtoremove)=>
    {
        dispatch({type:'REMOVE_ITEM',payload:{id:itemtoremove.id}})// remove product from cart (redux store)
        if(localStorage.getItem("cartitems"))
        {
           // if removed item is last then we set total to 0;
            setTotal(0)
        }
    }
    const decrementquantity=(itemtoremove)=>
    {
        
        dispatch({type:'DECREMENT_QUANTITY',payload:{id:itemtoremove.id}}) // we are sending id of item to remove from redux store
        if(localStorage.getItem("cartitems"))
        {
           
            setTotal(0)
        }
        else{
         console.log("0000"); 
           
        }
        
    }
//when click check out page is redirected to confirm address..
    const confirmcheckout=()=>
    {
        navigate(`/address/${total}`);
    }
    
    return(
        <>
        
        <div className="container-fluid  bg-danger container-div ">
    <div className="row row-style">
          
            <div className="col-lg-6 col-md-8 col-sm-12">
                <h3>Items in cart</h3>
               {
                items.map((item)=>
                <div className="row" >
                    <div className="col-sm-2 col-lg-4 col-md-4">
                        <img className="img img-style" src={item.image}/>
                    </div>
                    <div className="col-sm-2 col-lg-4 col-md-3 product-detail"  >
                        <p>{item.name}</p>
                        <p id="cost">{item.price}</p>
                       <button className="btn btn-dark" onClick={()=>removecartitem(item) }> <i className="fa-sharp fa-solid fa-trash"></i></button>
                    </div>
                    <div className="col-sm-2 col-lg-4 col-md-3 second-col" >
                        <div className="row">
                            <div>
                            <button className="btn btn-warning plusbutton m-3" onClick={()=>handleAddItem(item)}>+</button>
                           <input type="number" value={item.quantity} ></input>
                            <button className="btn btn-warning m-3" onClick={()=>decrementquantity(item)} >-</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                )
                }
            </div>

            
            <div className="col-lg-6 col-md-4" >
                <div className="card">
                    <div className="card-title">
                        <h4>Summary</h4>
                    </div>
                   <div className="card-body">
                     <div className="container-fluid">
                         <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-2">
                                cost
                            
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-10">
                              <p>  ${total}</p>
                            </div>
                         </div>
                         <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-2">
                               Shipping                            
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                $0
                            </div>
                         </div>
                         <div className="row">
                            <hr/>
                         </div>
                         <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-2">
                               Total                            
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                ${total}
                            </div>
                         </div>
                     </div>
                     <center>   <button className="btn btn-warning" onClick={confirmcheckout}>Check Out</button></center>
                  </div>
                </div>
            </div>
    </div>
</div>

        
        </>
    )
}
export default Cart;