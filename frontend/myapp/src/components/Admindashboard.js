import React, { useEffect } from "react";
import dress_img from './images/dresses.jpg'
import './homecover1.css'
import './admin.css'
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Slider from "./Slider";

const AdminDashboard = () => {
    const [productname, setProductname] = useState("")
    const [image, setImage] = useState({ preview: '', data: '' })
    const [finaliList,setFinalList]=useState([]);
    const navigate = useNavigate();
    const [price,setPrice]=useState(0);
    const [category,setCategory]=useState("");
    
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    useEffect(()=>
    {
        
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
    },[])
    const handleFileSelect = (event) => {
        console.log((event.target.files[0]))
        console.log(URL.createObjectURL(event.target.files[0]));

        const img = {
            preview: URL.createObjectURL(event.target.files[0]),//url of file
            data: event.target.files[0]  //data about file like file name ,size,createdate
        }
        setImage(img);
        console.log(img);
    }

    const handleImageUpload = async () => {
        var formData = new FormData();
        formData.append('file', image.data);
        console.log(image.data);

        const response = axios.post(`${API_BASE_URL}/uploadfile`, formData) //changes
        return (response);

    }

    const addproduct = async (event) => {
        // event.preventDefault();

        //   setLoading(true);
        console.log("Inside function post")
        console.log(category);
        const imgRes = await handleImageUpload();
        console.log(imgRes);
        const request = { name: productname, price: price, quantity: '2', category: category, image: `${API_BASE_URL}/files/${imgRes.data.filename.filename}` } //changes

        console.log(`${API_BASE_URL}/files/${imgRes.data.filename.filename}`);
        const postResponse = await axios.post(`${API_BASE_URL}/addproductbyadmin`, request, CONFIG_OBJ)
        // setLoading(false);

        if (postResponse) {
            console.log("post created successfully")
            navigate('/');
        }
    }
    //admin can delete product from database..
    const removeProduct= async(itemToRemove)=>
    {
        console.log(itemToRemove);
        const id=itemToRemove._id
        console.log(id);
        try{
             const response= await axios.delete(`${API_BASE_URL}/deleteproductbyadmin/${id}`)
             if(response.status==201)
             {
                console.log("Product deleted successfully");
             }
        }
        catch(error)
        {
            console.log(error);
        }
        
    }
    return (
        <>
            <div className="div_nav">
                <nav className="navbar navbar-expand">
                    <ul className="navbar-nav navbar_content fw-bold">
                        <li className="navbar-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

                            Add Product

                        </li>
                        <li className="navbar-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" style={{ marginLeft: 15 }}>
                            Manage Products
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <textarea type="text" value={productname} className="form-control addtweet" placeholder="Product Name" onChange={(e) => setProductname(e.target.value)}>
                                    </textarea>
                                   <input className="mt-2" placeholder="Price" type="number" onChange={(e)=>setPrice(e.target.value)}></input>
                                   <select onChange={(e)=>setCategory(e.target.value)}>
                                   <option value="kids" >kids</option>
                                   <option >women</option>
                                   <option >men</option>
                                   </select>
                                </div>
                                <div className="image-tweet">
                                    <div className=" mt-2">
                                        <input type="file" name="file" id="drop_zone" className="fileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect}></input>
                                        {image.preview && <img src={image.preview} width='150' height='150' ></img>}

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={addproduct} data-bs-dismiss="modal">Add Product</button>

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        


            <div>
                <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Manage Products</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <h3  className="title-allproducts font-effect-neon">AllProducts</h3>
            <div className="container-fluid main_div">

                <div className="row common_div">
                {
                            finaliList.map((item) =>
                    <div className="col-lg-6 col-md-6 mt-2  d-flex align-items-stretch commom_column_class">
                    
                        <div className="card">
                           
                                <img className="card-img-top img-style" src={item.image} />
                                <div className="card-body">
                                    <h6 >{item.name} </h6>
                                    <p><b>${item.price}</b></p><p>{item.name}
                                    </p>
                                    <button type="button" className="btn btn-secondary" onClick={()=>removeProduct(item)}><i className="fa-sharp fa-solid fa-trash"></i></button>
                                  
                                </div>

                               

                        </div>
                    
                    </div>
                    )}
                </div>
            </div>
            </div>
                            <div className="modal-footer">
                                

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default AdminDashboard;