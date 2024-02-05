import React from "react";
import './registration.css'
import { useState } from "react";
import axios from 'axios';
import {API_BASE_URL} from '../../src/config'
import Header from "./Header";
import {Link ,useNavigate } from 'react-router-dom'
const Registration =()=>
{
    const navigate=useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("");
    const [address,setAddress]=useState("")
    const submitdata=()=>
    {
        if(!name||!email||!username||!password||!address)
        {
            console.log("All fields are mandatory");
            return;
        }
        console.log("inside submit function")
        const requestdata={name:name,email:email,username:username,password:password,address:address};
        axios.post(`${API_BASE_URL}/registeruser`,requestdata)
        .then((result)=>
        {
            if(result)
            {
                console.log(result);

            }
        })
        .catch((error)=>
        {
            console.log(error);
        })

        navigate("/loginuser")

        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setAddress("");

    }
    return(
        <>
        <div class="container-fluid register_container">
        <div class="form_container" >
            <form onSubmit={(e)=>submitdata(e)}>
                <h3>Registration</h3>        
                <label>Name</label><br/>
                <input  className="form-control" type="text" placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)}/>
                <label >Email</label>
                <input  className="form-control" type="email" placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)}/>
                <label>UserName</label>
                <input  className="form-control" type="text" placeholder="Enter your UserName" onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password:</label><br/>
                <input id="password" class="form-control" type="password"  placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/><br></br>
                <label>Address</label>
                <textarea className="form-control" onChange={(e)=>{setAddress(e.target.value)}}></textarea>
                <button class="btn btn-warning form-control mt-2" type="submit" onSubmit={(e)=>submitdata(e)}>Submit</button>
            
            </form>
        </div>
        </div>
        </>
    )
}
export default Registration;