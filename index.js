
//....IMPORTING MODULES........

const express = require("express");  //importing the express frame work 
const dotEnv = require('dotenv')  // import the dotenv module for enivironment varible management 
const mongoose = require('mongoose')  //import mongoose for MongooDb interactions
const vendorRoutes = require('./routes/vendorRoutes')  //import vendor routes from a separates file 
const bodyParser = require('body-parser')  //import the body-parser for passing request bodies 4
const firmRoutes = require('./routes/firmRoutes') //
const productRoutes = require('./routes/productRoutes') 
const path = require('path')
const cors = require('cors') 



//.................END...............................


//...............SETING UP EXPRESS APP.......................

const app = express()  //create a new express application 
const PORT = process.env.PORT || 4000  //define port number for the server 


//...................END...........................

//............CONFIGURING ENVIRONMENT VARIABLES ..........................

dotEnv.config();  //load environment variables from .env file 
app.use(cors())


//.....................END.......................................


//..............CONNECTING TO MONGODB...............

mongoose.connect(process.env.MONGO_URL)   // connects to MongoDb using the URL stored in MONGO_URL enivironment variable 
.then(() => console.log("MongoDB connected Successfully!!")) // log suceess message when coonected 
.catch((error) => console.log(error))  // log any connection error


//..................END...........................


//.................CONFIGURING EXPRESS MIDDLEWARE....................................

app.use(bodyParser.json()) //enables json body parsing for incomming requests
app.use('/vendor', vendorRoutes); //Mounts vendor routes at the vendor path 
app.use('/firm' , firmRoutes);    //Mounts Firm routes at the vendor path 
app.use('/product', productRoutes)
app.use('/uploads' , express.static('uploads')) 


///....................END..........................


//....................STARTING THE SERVER ...............................

app.listen(PORT , () => { 
    console.log(`server started and running at ${PORT}`);  // start the server listeing on the specifieed port

} )
app.use('/' , (req , res) => {
    res.send("<h1>Wellcome to Mahe_Resturent </h1>")

})

//................END...............................