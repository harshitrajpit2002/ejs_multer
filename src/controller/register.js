const bcrypt=require('bcrypt');
const {user} =require('../Models/User');

const register=async(req,res)=>{
    const data=req.body;
    console.log(data);

    let email1=data.email;
    let username1=data.username;
    let password1=data.password;
    //unique username
    const existingUser=await user.findOne({username:data.username});
    if (existingUser) {
        return res.status(400).send('username already exists')
    }
    //validate user
    if(!email1||!username1||!password1)
    {
        res.status(400).send("Missing user Information");
    }
    //validate email Pattern
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email1)) {
        res.status(400).send("Invalid email format");
        return;
    }

    //Validate Password
    const passwordPattern=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(!passwordPattern.test(password1))
    {
        res.status(400).send("Invalid password format");
        return ;
    }
    // encrypt the password and save it to the database
    const encryptAndSavePassword=async()=>{
        try {
            const saltPassword=10;
        const hashedPassword=await bcrypt.hash(password1,saltPassword);
        data.password=hashedPassword;
        const newUser=new user(data);
        await newUser.save();
        console.log("user data saved successfully");
        } catch (error) {
            console.error('Error saving user data',error);
        }
    }
    encryptAndSavePassword();
    res.sendStatus(200);        
}
module.exports=register;