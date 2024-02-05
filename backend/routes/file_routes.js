const express=require('express');
const router=express.Router();


const multer=require('multer');

const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads/')
        },
        filename:(req,file,cb)=>{
           cb(null,file.originalname)
        }
})

const upload=multer({
    storage:storage,
 
});

router.post('/api/v1/ecommerce/uploadfile',upload.single('file'),(req,res)=>
{
    console.log(req.file.filename);
    res.json({"filename":req.file})
})
const downloadfile=(req,res)=>
{
    const filename=req.params.filename;
    const path= _basedir+"/uploads/";

    console.log("inside download");
    console.log(path);

    res.download(path+filename,(error)=>
    {
        if(error)
        {
           res.status(500).send({message:"File can not be downloaded"+error});
        }
    })
}
router.get("/api/v1/ecommerce/files/:filename",downloadfile);

module.exports=router;