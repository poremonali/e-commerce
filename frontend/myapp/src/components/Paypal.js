import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Paypal = () => {
    const { total } = useParams();
    const paypal = useRef();
    // const {total}=useParams();
    const { address, email, isadmin, name, userid } = JSON.parse(localStorage.getItem("user"));
    // const{}
    const [itemList, setItemList] = useState([]);
    const [productid, setProductId] = useState([]);
    const [isProduct,setIsProduct]=useState("");
    const navigate=useNavigate();
    const paypaldiv = () => {
        console.log(total);
        window.paypal.Buttons({
            createOrder: (data, actions, error) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "online shopping",
                            amount: {
                                currency_code: "CAD",
                                value: total
                            }
                        }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order);

            },
            onError: (err) => {
                console.log(err);
            }


        }).render(paypal.current)

    }
    useEffect(() => {
        console.log((JSON.parse(localStorage.getItem("cartitems")).length));
        //const [{id,image,name,price,quantity,uid}]=JSON.parse(localStorage.getItem("cartitems"));

        setItemList(...itemList, (JSON.parse(localStorage.getItem("cartitems"))));
        console.log(itemList);
        for (let i = 0; i < itemList.length; i++) {
            console.log(itemList[i].id);
            setProductId(...productid, itemList[i].id)
        }
        console.log(productid);
    }, [])


    const addtoOrder = async () => {
        const id = userid;
        /*  const requestdata={userId:userid,amount:total,del_status:"delivered",address:address}
          axios.post(`${API_BASE_URL}/addorderbyuserid`,requestdata)
          .then((response)=>
          {
              console.log(response);
          })
          .catch((error)=>
          {
              console.log(error);
          })*/
        const response = await axios.get(`${API_BASE_URL}/getallorders/${id}`);
        if (response.data != '') {

            // / axios.put(`${API_BASE_URL}/updateroductslist`);
            console.log((JSON.parse(localStorage.getItem("cartitems")).length));

            //    setItemList(...itemList,JSON.stringify(localStorage.getItem("cartitems")));
            console.log(response);
            setProductId(...productid,response.data.products);
            for (let i = 0; i<itemList.length; i++)
            {
              
                for(let j=0;j<productid.length;j++)
                {
                    if(itemList[i].id===productid[j])
                    {
                        console.log("same")
                        const requestdata = { userId: userid, products: itemList[i].id }
                             axios.put(`${API_BASE_URL}/updateroductslist`, requestdata)
                                 .then((response) => {
                                     console.log(response);
                                     console.log("product added successfully");
                                 })
                                 .catch((error) => {
                                     console.log(error);
                                 })

                          //break;
                    }
                    else
                    {
                        setIsProduct("no")
                        
                    }
                    
                }
              
            }//for loop

        }
        else
        {
            console.log("In else section");
            const requestdata = { userId: userid, amount: total, del_status: "delivered", address: address }
            axios.post(`${API_BASE_URL}/addorderbyuserid`, requestdata)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
               for (let i = 0; i<itemList.length; i++)
                {
                       const requestdata = { userId: userid, products: itemList[i].id }
                             axios.put(`${API_BASE_URL}/updateroductslist`, requestdata)
                                 .then((response) => {
                                     console.log(response);
                                     console.log("product added successfully");
                                 })
                                 .catch((error) => {
                                     console.log(error);
                                 })
                }
        }

    
        alert("order confirmed")
        navigate("/allproducts")
    }
    return (
        <>
            <h3 className="text-center">Payment</h3>
            <div ref={paypal}>

            </div>
            <button className="btn btn-primary " style={{ marginRight: 10 }} onClick={paypaldiv}>Paypal</button>
            <button className="btn btn-primary" onClick={addtoOrder}>Cash on Delivery</button>
        </>
    )
}
export default Paypal;