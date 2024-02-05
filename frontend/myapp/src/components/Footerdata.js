import React from "react";
import './footer.css'
import { Link } from "react-router-dom";
function Footerdata()
{
    return(
        <>
         <div className="container-fluid bg-secondary footercontent  container-div">
            <div className="row ">
                
                <div className="col-lg-3" >
                   <ul className="unorderlist">
                    <li><h5><Link style={{color:"black"}}  to="/categoryproducts/women">women</Link></h5></li>
                   
                   </ul>
                </div>
                <div className="col-lg-3">
                    <ul className="unorderlist">
                    <li><h5><Link style={{color:"black"}}  to="/men">men</Link></h5></li>
                       
                       </ul>
                </div>
                <div className="col-lg-3">
                    <ul className="unorderlist">
                        
                    <li><h5><Link style={{color:"black"}}  to="/kids">kids</Link></h5></li>
                    </ul>
                </div>
                <div className="col-lg-3">
                    <ul className="unorderlist">
                        <li><h5><b>Links</b></h5></li>
                        <li><h5><Link style={{color:"black"}}  to="/">Home</Link></h5></li>
                        <li><h5><Link style={{color:"black"}}  to="/loginuser">Login</Link></h5></li>
                        
                       </ul>
                </div>
            </div>
            <div className="div_horizontalow"> 
            <hr className="horizontalrow"/>
            </div>
            <div className="row">
                    <div className="col-lg-12 col-md-12">
                        
                        <span className="followus">Follow Us</span>
                        <ul className="unorderlist" id="social_links">
                            <li>
                               <a href="#" target="_blank"> <i className="fa-brands fa-facebook text-dark"></i></a>
                            </li>
                            <li>
                                <a href="#" > <i className="fa-brands fa-square-instagram text-dark"></i></a>
                            </li>
                    
                            <li>
                                <a href="#" >  <i className="fa-brands fa-twitter text-dark"></i></a>
                            </li>
                            <li>
                                <a href="#" > <i className="fa-brands fa-linkedin text-dark"></i></a>
                            </li>
                        </ul>
                        <br/>
                      <center>  <i className="fa-regular fa-copyright"></i><span className="copyright" >   Copyright2023 Kalanidhi.com.All rights reserved.</span></center>
                    </div>
            </div>
            
        </div>
        </>
    );
}
export default Footerdata;