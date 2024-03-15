const mongoose=require('mongoose');

try{
    mongoose.connect('mongodb+srv://sanyam:Sanyam%407820@cluster0.h0ddjdt.mongodb.net/to-do-app');
    console.log('databse connected successfully');
}
catch(e){
    console.log('Error while connecting to database')
}

//make schema

const Todoschema=mongoose.Schema({
    title:String,
    description:String,
})

//defining model(model is used so that we can interact with databse)
const todo=mongoose.model('todos',Todoschema);

module.exports={
    todo
}