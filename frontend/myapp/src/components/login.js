import React,{useState} from "react";
import './loginpage.css';
import axios from 'axios';
import {API_BASE_URL} from '../../src/config'
import Header from "./Header";
import {Link ,useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from "react-redux";


const Login=()=>
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    
    const dispatch=useDispatch();
    const navigate=useNavigate(); 
    const user = useSelector(state => state.userReducer1)
    
    const submitdata=(e)=>
    {

      e.preventDefault();
        if( !email ||!password)
        {
            
            console.log("all fields are mandatory");
            return;
        }
       
        const requestData={email:email,password:password}
        console.log(requestData);
        console.log(`${API_BASE_URL}`);
        axios.post(`${API_BASE_URL}/loginuser`,requestData)
        .then((result)=>{
           
            if(result.status==200)
            {
                localStorage.setItem("token",result.data.result.token);
                localStorage.setItem("user",JSON.stringify(result.data.result.user))

                // dispatch to redux store..
                console.log(result.data.result.user.isadmin);
                setEmail('');
                    setPassword('');
                dispatch({type:"LOGIN_SUCCESS",payload:result.data.result.user })
                console.log(JSON.stringify(user.user));
                
               
                    
                navigate('/');
               
             
   
            }
           
        })
        .catch((error)=>{
            console.log(error);
        })
       
      
    }

    return(
        <>
        
        <div class="container-fluid login_container">
        <div class="form_container shadow" >
            <form onSubmit={submitdata}>
                <h3>Login</h3>        
                <label>E-mail:</label><br/>
                <input id="email" class="form-control" value={email} type="email" placeholder="Enter your E-mail" onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password:</label><br/>
                <input id="password" class="form-control" type="password"  value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/><br></br>
                <button class="btn btn-warning form-control" type="submit" onSubmit={submitdata}>Submit</button>
                <p className='mt-2'>Already Registered?<Link className='text-primary  btn mb-1 ml-1' to="/register"  >SignUp</Link></p>          
            </form>
        </div>
        </div>
        </>
    )
}
export default Login;