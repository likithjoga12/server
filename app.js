let express=require("express");
require("./db");
let Users=require('./person')
let Employee=require( './Employee');
let app=express();
let cors=require( "cors");
app.use(cors());
app.use(express.json())

app.get("/student",async(req,res)=>{

    let user=await Users.find();
    if(user.length>0){
        res.send(user)
    }
    else{
        res.send("no data  found");
    }
})
app.get("/employee",async(req,res)=>{

    let user=await Employee.find();
    if(user.length>0){
        res.send(user)
    }
    else{
        res.send("no data  found");
    }
})
app.post('/student',async (req, res) => {
   
    let user= new Users(req.body);
    let result=await user.save()
    res.send(result)
})
app.post('/employee',async (req, res) => {
   
    let user= new Employee(req.body);
    let result=await user.save()
    res.send(result)
})
app.delete('/student/:_id', async (req, res) => {
  let user=await Users.deleteOne(req.params);
  res.send(user)
    // res.send("Deleted")
});
app.delete('/employee/:_id', async (req, res) => {
    let user=await Employee.deleteOne(req.params);
    res.send(user)
      // res.send("Deleted")
  });
app.get( "/student/:id",async ( req , res )=>{
    let user = await Users.findOne({_id: req.params.id});
    
   res.send(user)
   })
   app.get( "/employee/:id",async ( req , res )=>{
    let user = await Employee.findOne({_id: req.params.id});
    
   res.send(user)
   })
   app.put("/student/:id" ,async (req , res)=>{
       let updateUser = await Users.updateOne({_id: req.params.id},{$set : req.body} );
       res.send(updateUser)
   })
   app.put("/employee/:id" ,async (req , res)=>{
    let updateUser = await Employee.updateOne({_id: req.params.id},{$set : req.body} );
    res.send(updateUser)
})
   app.get( '/search/:key' , async ( req , res )=>{

    let user= await Users.find({ $or:[
        {name:{$regex:req.params.key}},
        {email:{$regex:req.params.key}},
        {address:{$regex:req.params.key}}
    ]})
    res.send(user)
})
app.get( '/search2/:key' , async ( req , res )=>{

    let user= await Employee.find({ $or:[
        {name:{$regex:req.params.key}},
        {email:{$regex:req.params.key}},
        {address:{$regex:req.params.key}},
        {
            salary:{$regex:req.params.key}
        },
        {phone:{ $regex: req.params.key }}
    ]})
    res.send(user)
})
app.listen(4000);
console.log('Server is running at http ://localhost:4000');