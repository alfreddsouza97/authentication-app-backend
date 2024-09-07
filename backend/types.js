

const zod = require("zod");


const signupZod = zod.object({

    email: zod.string().email(),

    password: zod.string().min(6)
})


module.exports = {

    signupZod: signupZod
}