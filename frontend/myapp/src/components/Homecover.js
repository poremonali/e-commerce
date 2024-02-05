import React from "react";
import dress_img from './images/dresses.jpg'
import './homecover1.css'
import Slider from "./Slider";
import { UseSelector, useSelector } from "react-redux";
import AdminDashboard from "./Admindashboard";
const Homecover = () => {
    const user = useSelector(state => state.userReducer1)
    ///this component is created to dispaly image and slogan of website
    return (
        <>
            <> <div class="wrapper" >

                <img className="img img-style" src={dress_img} alt="shopImage" />

                <div className=" logo_slogan ">
                    <div className="name_slogan_background">
                        <div className="container break-text">
                            <h1 id="Name_shop">Kalanidhi</h1>
                            <p className="slogan_para">Well Designed and well Printed only for you.

                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
            
            <Slider />
            </>   
        
    )
}

export default Homecover;