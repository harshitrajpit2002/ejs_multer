const {verify}=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const accessSecret=process.env.ACCESS_SECRET ||'';

//AUTHENTICATOR MIDDLEWARE
const authenticator=(req,res,next)=>{
    //const accessToken=req.cookies.accessToken
    const accessToken=req.header('authorization')
    console.log(`this is my token ${accessToken}`)

    if(!accessToken)
    {
        res.status(401).send("Access token Not Found");
    }
    try {
        const decode=verify(accessToken.replace('Bearer',''),accessSecret);
        const userdata=decode;
        req.id=userdata.id;
        next();
    } catch (error) {
        return res.status(403).send('Invalid Token');
    }
}
module.exports={authenticator};
