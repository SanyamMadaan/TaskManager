const express=require('express');
const {createTodo}=require('./types');
const {todo}=require('./db');
const app=express();
const cors=require('cors');
const {User}=require('./db')
const jwt=require('jsonwebtoken');
const key=require('./config');
const authmiddleware=require('./middlewares/authmiddleware');

app.use(express.json())//using middleware so that post request will be send easily
app.use(cors());

app.post('/signin',async (req,res)=>{
const email=req.body.email;
const password=req.body.password;
try{
const existinguser=await User.findOne({
    email,
    password
})
if(existinguser){
    const Id=existinguser._id;
    const token=jwt.sign({Id},key);
    return res.status(200).json({"token":token})
}
return res.status(411).json("User not exist")
}
catch(e){
    console.log("Error while finding user",e);
}
})

app.post('/signup',async (req,res)=>{
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const password=req.body.password;

    const existinguser=await User.findOne({
        email
    })
    if(existinguser){
        return res.status(403).send("User already exixts");
    }
    if(!existinguser){
    try{
    const response=await User.create({
        email,
        firstname,
        lastname,
        password
    })
    const Id=response._id;
    const token=jwt.sign({Id},key);
    res.status(200).json({"token":token})
}catch(e){
    console.log(e);
}
}
})

///////////////task routing////////////////

app.post('/todo',authmiddleware,async(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const userId = req.userId; // Retrieve userId from authmiddleware
    //put in database
    try{
    await todo.create({
        title,
        description,
        userId
    })

    res.status(200).json({
        msg:'to do created'
    })
}catch(e){
    return res.status(411).json("Error while creating task");
}
})

app.get('/todos', authmiddleware, async (req, res) => {
    const userId = req.userId; // Change this to req.userId instead of req.query.userId
    console.log(userId); // Ensure userId is correctly logged
    try {
        const userTodos = await todo.find({ userId }); // Query only tasks associated with the authenticated user
        console.log({userTodos})
        res.status(200).json(userTodos);
    } catch (error) {
        console.log("Error fetching user's todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

  
app.delete('/delete',async(req,res)=>{
    const id=req.query.id;
    if(!id){
        return res.status(411).json({msg:"Not valid task"})
    }
    const remainingtodo=await todo.deleteOne({
        _id:id
    })
    res.status(200).json({msg:"Task deleted successfully"})
    })

app.put('/edit', async (req, res) => {
        const task = req.body.task;
        const description = req.body.desc;
        const id = req.query.id;
        if (!id) {
          return res.status(411).json({ msg: "Not valid id" });
        }
        const updatedTask = await todo.updateOne(
          { _id: id },
          { $set: { task, description } }
        );
        if (updatedTask.Modified === 1) {
          res.status(200).json({ msg: "Task updated successfully" });
        } else {
          res.status(500).json({ msg: "Task not updated" });
        }
      });
      
app.listen(3000);