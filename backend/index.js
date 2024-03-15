//write basic express boiler code
const express=require('express');
const {createTodo}=require('./types');
const {todo}=require('./db');
const app=express();
const cors=require('cors');

app.use(express.json())//using middleware so that post request will be send easily
app.use(cors());

//CREATE A NEW TO DO
app.post('/todo',async(req,res)=>{
    const createPayload=req.body;
    console.log(createPayload);
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"You have sent wrong inputs"
        })
        return;
    }
    //put in database
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
    })

    res.status(200).json({
        msg:'to do created'
    })

})

//--------GET ALL TODO'S
app.get('/todos',async (req,res)=>{
    const alltodo=await todo.find({});//this will send promise so we have to await them
    res.status(200).json(alltodo);
})


// //-------MARK A TODO AS DONE
// app.put('/completed',async (req,res)=>{
// const updatepayload=req.body;
// const parsePayload=updateTodo.safeParse(updatepayload);
// if(!parsePayload.success){
//     res.status(411).json({
//         msg:"You send wrong inputs"
//     })
//     return;
// }
// //update in databse
// await todo.updateOne({
//     _id:req.body.id//in mongodb _id is created automatically
// },{
//     completed:true
// })

// res.status(200).json({
//     msg:'to do marked as done'
// })

// })

app.listen(3000);