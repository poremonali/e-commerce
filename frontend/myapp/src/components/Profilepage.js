import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {API_BASE_URL} from '../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

//component used to display perticular product detail..when user click on name of product
const Profilepage=()=>
{

    const [productdata,setProductData]=useState([]);
    const [finaliList, setFinalList] = useState([]);
    const navigate = useNavigate();
    const dispatch=useDispatch();


//    const user = useSelector(state => state.userReducer1)

const{name,email,address,userid}=JSON.parse((localStorage.getItem("user")))
    useEffect((req,res)=>
    {
        console.log(`${userid}`);
        axios.get(`${API_BASE_URL}/getallorders/${userid}`)
        .then((result) => {
            console.log(result);
        //    console.log(JSON.stringify(user.user));
            setFinalList(result.data.Allproducts)
            //console.log(finaliList[0]);
        })
        .catch((error) => {
            console.log(error);
        })
        
    },[])
    return(<>
  
    <div className="container-fluid">
        <div className="card shadow" style={{margin:50}}>
          
            <div className="card-body" style={{marginLeft:50}}>
                <h6 className="card-title">
              <label>Name:</label>         {name} <br/> <br/>
              Email  : {email}<br/><br/>
              Address  :{address}
              </h6>

            </div>
        </div>
    </div>
    
    </>);
}
export default Profilepage;