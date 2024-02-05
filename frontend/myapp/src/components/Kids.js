import React from "react";
import dress_img from './images/dresses.jpg'
import './homecover1.css'
import './allproducts.css'
import './admin.css'
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Kids = () => {

  //  const {category}=useParams();
    const [productname, setProductname] = useState("")
    const [image, setImage] = useState({ preview: '', data: '' })
    const [finaliList, setFinalList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.userReducer1)
    const items = useSelector(state => state.itemreducer.items);

    function fetchData() {
    //    console.log(category);
      
        if (localStorage.getItem("user")) {
            console.log(JSON.parse(localStorage.getItem("user")));
            const { email, name, userid, isadmin } = JSON.parse(localStorage.getItem("user"))
            const data = { email: email, isadmin: isadmin, name: name, userid: userid }
            console.log(email);
            dispatch({ type: "LOGIN_SUCCESS", payload: data })
        }
        axios.get(`${API_BASE_URL}/getcategoryproducts/kids`)
            .then((result) => {
                console.log(result);
                console.log(JSON.stringify(user.user));
                setFinalList(result.data.Allproducts)
                //console.log(finaliList[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {

        //   console.log(JSON.stringify(user.user));

        fetchData();
    },[])
//product added to cart(redux store)
    const handleAddItem = (itemtoadd) => {
        console.log(itemtoadd._id);
        dispatch({ type: "ADD_ITEM", payload: { id: itemtoadd._id, uid: user.user.userid, name: itemtoadd.name, price: itemtoadd.price, image: itemtoadd.image, quantity: 1 } })
        console.log("item added to item store");
        console.log(items);
        navigate("/cart")
    }

    //Function called to display perticular product details when user click product name...
    const productdetail = (id) => {
        console.log(id);
        navigate(`/getproductdetail/${id}`)
    }
    return (
        <>

            <h3 className="title-allproducts font-effect-neon">Kids</h3>
            <div className="container-fluid main_div">

                <div className="row common_div">
                    {
                        finaliList.map((item) =>
                            <div className="col-lg-2 col-md-4 col-sm-12 mt-3  d-flex align-items-stretch commom_column_class">

                                <div className="card" style={{width:200}} >

                                    <img className="card-img-top img-style" src={item.image} />
                                    <div className="card-body">
                                        <h6 className="btn card-title" onClick={() => productdetail(item._id)} >{item.name} </h6>
                                        <p><b>${item.price}</b></p><p>{item.name}
                                        </p>


                                    </div>

                                    <button className="btn  bg-warning button-style" onClick={(e) => handleAddItem(item)} >
                                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                        <b>Add to cart</b>
                                    </button>


                                </div>

                            </div>
                        )}
                </div>
            </div>
        </>
    )
}
export default Kids;