const zod=require('zod');

//one way of validation using zod when we have linited input and functionality
// const titleschema=zod.string();
// const descriptionschema=zod.string();

const createTodo=zod.object({
    title:zod.string(),
    description:zod.string()
})

// const updateTodo=zod.object({
//     id:zod.string()
// })

module.exports={
    createTodo,
    // updateTodo
}
