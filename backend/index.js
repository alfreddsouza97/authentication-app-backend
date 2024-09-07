

const express = require("express");
const { signupZod } = require("./types");
const { Users } = require("./db");

const app = express();

app.use(express.json());


app.post('/signup', async function(req, res){

    const createPayload = req.body;

    console.log(createPayload);
    

    const parsedPayload = signupZod.safeParse(createPayload);


    console.log(parsedPayload);
    


    if(!parsedPayload.success){

        res.status(400).json({msg: "You have entered invalid email / password"})

        return;
    }

    const userFound = await Users.findOne({

        email: createPayload.email

    })


    if(userFound){

        res.status(400).json({msg: "User Email already exists in Database. Proceed to login"})
    }

    else {

        await Users.create({

            email: createPayload.email,

            password: createPayload.password
        })
        .then(function(){

            res.status(200).json({msg: "User created."})
        })
    }





})

app.post('/login', async function(req, res){

    const createPayload = req.body;

    const parsedPayload = signupZod.safeParse(createPayload);

    if(!parsedPayload.success){

        res.status(400).json({msg: "You have sent invalid email / password"});

        return;
    }

    const userFound = await Users.findOne({

        email: createPayload.email,

    })


    console.log(userFound);

    if(userFound){

        if(userFound.password === createPayload.password){

            res.status(200).json({msg: "Login Success"})
        }

        else {

            res.status(400).json({msg: "Email Found in DB but password entered by you is not matching to the password stored in DB."})
        }
    }

    else {

        res.status(400).json({msg: "Invalid Email"})
    }



   
    

  
  

 
})


app.listen(3000);