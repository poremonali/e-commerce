const express=require('express')
const dotenv=require('dotenv');

require('./models/dbconnect')


dotenv.config();
const app=express();
var cors=require('cors') //
app.use(cors());


const PORT=process.env.PORT || 5000;
app.use(express.json());
global._basedir =__dirname;

app.get('/',(req,res)=>{
    res.status(200).send({message:"wel come"});
})
app.use(require('./routes/seedroutes'))
app.use(require('./routes/userroutes'))
app.use(require('./routes/admin_routes'))
app.use(require('./routes/file_routes'))
app.listen(PORT,()=>
{
    console.log(`Application started on ${PORT}`);
})
