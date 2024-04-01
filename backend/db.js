const mongoose=require('mongoose');

try{
    mongoose.connect('mongodb+srv://sanyam:Sanyam%407820@cluster0.h0ddjdt.mongodb.net/to-do-app');
    console.log('databse connected successfully');
}
catch(e){
    console.log('Error while connecting to database')
}

//make schema

const Userschema = mongoose.Schema({
    email:String,
    firstname: String,
    lastname: String,
    password: String,
  });

  const User = mongoose.model("User", Userschema);
   
  const Todoschema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    title:String,
    description:String,
})

  
//defining model(model is used so that we can interact with databse)
const todo=mongoose.model('todos',Todoschema);

module.exports={
    todo,
    User
}