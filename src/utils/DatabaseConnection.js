const mongose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

async function connectToDatabase(){
    try{
        await mongose.connect('mongodb+srv://rajputharshit37:o1a5tlHt4nJBjSOc@cluster1.rfmuxty.mongodb.net/?retryWrites=true&w=majority');
        console.log('connect to database')
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    }

}module.exports = { connectToDatabase };
