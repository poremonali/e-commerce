const userModel=require('../models/user_model')
const productModel=require('../models/product_model')
const bcryptjs=require('bcryptjs') //used to encrypt password
const seedUser=(req,res)=>
{
    //array of users containing one admin ..
    //isAdmin field is used to show user is admin or not..if yes then isAdmin=true otherwise false
    const arrayuser=[{name:"Vibha",email:"vibha@gmail.com",username:"vibha123",address:"pune",password:"vibha",isadmin:false},{name:"Varsha",email:"v@gmail.com",username:"varsha",address:"chikhali,pune",password:"varsha",isadmin:false},{name:"krish",email:"k@gmail.com",username:"krish",address:"Mumbai",password:"krish",isadmin:false},{name:"mona",email:"mona@gmail.com",username:"mona",address:"pune",password:"mona",isadmin:false},{name:"monali",email:"monali@gmail.com",username:"monali",address:"pune",password:"monali",isadmin:true}]
    try{
        for(let i=0;i<arrayuser.length;i++)
        {
        bcryptjs.hash(arrayuser[i].password,16)
        .then((hashedpassword)=>
        {
            const seeduser=new userModel({name:arrayuser[i].name,email:arrayuser[i].email,username:arrayuser[i].username,address:arrayuser[i].address,password:hashedpassword,isAdmin:arrayuser[i].isadmin})
        
            seeduser.save()
            .then((response)=>
            {
                if(i==(arrayuser.length-1))
                res.send("success")
            }
            )
            .catch((error)=>
            {
                console.log(error)
            })
        })
        .catch((error)=>
        {
            console.log(error);
        })
    
        
    }
    }
    catch(error){
        console.log(error);
    }

}

//seed products created in the form of array and inserted into database
const seedProduct=async(req,res)=>
{
    const finalproducts=[{name:"pink fancy top",price:300,quantity:5,category:"women",image:"https://unsplash.com/photos/woman-in-orange-dress-wearing-brown-sun-hat-standing-near-green-potted-plant-mTw2fL9Pwh8"},
                         {name:"Blue colour party wear",price:800,quantity:5,category:"women",image:"https://unsplash.com/photos/woman-in-blue-floral-dress-EtAV0Z_PmqU"},
                         {name:"spaghetti-strap-dress",price:400,quantity:5,category:"women",image:"https://unsplash.com/photos/woman-in-white-spaghetti-strap-dress-McLuTG2t4UQ"},
                         {name:"Yellow tracksuit",price:600,quantity:5,category:"women",image:"https://unsplash.com/photos/woman-in-yellow-tracksuit-standing-on-basketball-court-side-nimElTcTNyY"},
                         {name:"Trendy green-dress",price:200,quantity:5,category:"women",image:"https://unsplash.com/photos/stylish-woman-in-green-dress-enjoys-the-music-with-headphones-and-cell-phone-dancing-in-the-living-room-at-home-tKFjyL7Z6_M"},
                         {name:"Soft sweater",price:200,quantity:5,category:"kids",image:"https://unsplash.com/photos/a-young-child-smiles-while-wearing-a-red-sweater-pdvTVQ7swW4"},
                         {name:"Comfy dress for girls",price:200,quantity:5,category:"kids",image:"https://unsplash.com/photos/girl-sitting-on-bench-NV_IPwv0Saw"},
                         {name:"black-and-white-polka",price:300,quantity:5,category:"kids",image:"https://unsplash.com/photos/girl-in-black-and-white-polka-dot-long-sleeved-blouse-and-blue-shorts-standing-beside-red-petaled-flowers-during-daytime-e6lWMBIgNso"},
                         {name:"black nite track",price:200,quantity:5,category:"kids",image:"https://unsplash.com/photos/boy-wearing-black-nike-track-suit-Mw9TO8Wbz8A"},
                         {name:"pink-long-sleeve-shirt",price:200,quantity:5,category:"kids",image:"https://unsplash.com/photos/girl-in-pink-long-sleeve-shirt-and-black-pants-standing-on-gray-concrete-pathway-during-daytime-KfBqjdjDdaY"},
                         {name:"Trendy shirt for men",price:300,quantity:5,category:"men",image:"https://unsplash.com/photos/a-man-wearing-a-hat-AJMPHTN2YV8"},
                         {name:"blue-suit for men",price:900,quantity:5,category:"men",image:"https://unsplash.com/photos/man-in-blue-suit-standing-on-sidewalk-during-daytime--eb0moHDPBI"},
                         {name:"black-suit-jacket",price:700,quantity:5,category:"men",image:"https://unsplash.com/photos/man-in-black-suit-jacket-and-black-sunglasses-Uw3OfKz2J-0"},
                         {name:"Classy white shirt",price:300,quantity:5,category:"men",image:"https://unsplash.com/photos/a-man-sitting-on-a-bench-BGV9qZk_G58"},
                         {name:"gray-suit-jacket-and-black-pant",price:800,quantity:5,category:"men",image:"https://unsplash.com/photos/man-in-gray-suit-jacket-and-black-pants-wearing-black-sunglasses-standing-on-gray-concrete-stairs-RuBXafq461A"},
                        ]
    try{

        for(let i=0;i<finalproducts.length;i++)
        {
        const seedproduct=new productModel(finalproducts[i])
        seedproduct.save()
        .then((newuser)=>
            {
                if(i==finalproducts.length-1)
                res.status(201).send({message:"product added successfully"})
        
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        }    
        catch(error){
        console.log(error);
        }
        
}

module.exports={
    seedUser,
    seedProduct,
    
}