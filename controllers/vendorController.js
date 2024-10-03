       
    //..................IMPORTING modules......................


const Vendor = require('../models/Vendor') 
const jwt = require('jsonwebtoken')  //import the jsonwebtoken library for token generation 
const bcrypt = require('bcryptjs');  //import the bcryotjs library for password hashing 
const dotEnv = require('dotenv') 


dotEnv.config() 
const secretkey = process.env.WhatIsYourName

///.........................register..................................................
const vendorRegister = async (req, res) => {  // defines an asynchronous function vendorRegister to handle vendor registarion.. 
    const {username, email , password} = req.body  //extract username , email and password from the request body...... 

    try {
        const vendorEmail = await Vendor.findOne({email});  // existing vendor with the provided emails 

        if(vendorEmail) {
            return res.status(400).json('Email already taken');

        }
        const hashedPassword = await bcrypt.hash(password, 10); //hashes the provised password using bcrypt with a salt round of 10........

        
        const newVendor = new Vendor({
            username,                              // create a new vendor document with the provided username , email, and hashed password ,  
            email,
            password: hashedPassword
        });

        await newVendor.save(); // saves the new vendor document to the database

        res.status(201).json({message : "vendor register Successfully"}) 
        console.log('registered') 
    }
    catch(error) { 
        console.error(error) 
        res.status(500).json({error: "internal server error"})

    }

}

//...................................................................................


//........................login/..............................
const vendorLogin = async(req , res) => {   // defines an asynchronous function vendor login to handle vendor login requests 

    const {email , password} = req.body;   // extract email and password from the request body 

    try {
        const vendor = await Vendor.findOne({email})  //USES mongoose findOne method to find a vendoor document in the database with the matching email await keyword ensures the function waits for the database quiry to complete...

        if(!vendor || !(await bcrypt.compare(password , vendor.password))) {   //check two conditions ... 1) if a vendor document was found(!vendor).... 2) if the provided password matches the stored hashed password using bcrypt.compare....
            return res.status(401).json({error : "invalid username or password"}) 
    }

    const token = jwt.sign({vendorId: vendor._id}, secretkey , {expiresIn : "1h"})   //jwt.sign() create a new JWT 

    res.status(200).json({success: "Login successful" , token}) 
    console.log(email,"this is token ", token) 
}
catch(error) {
    console.log(error) 
    res.status(500).json({error : "Internal server error"})


}

}
//.............................END............................................................


const getAllvendors = async(req, res) => {  //define an asynchronous function ti handle the GET request 
    try {
        const vendors = await Vendor.find().populate('firm');

        res.json(vendors)
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : "Internal server error"}) 
    }
}

// ............................END........................................

const getVendorById = async(req, res) => { 
    const vendorId = req.params.id;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm'); 

        if(!vendor) {
            return res.status(404).json({error : "vendor not found"})
         }
         res.status(200).json({vendor})
    }
    catch (error){
        console.log(error) 
        res.status(500).json({error : "Internal server error"}) 

    }
}




//.........................................................................................

module.exports = { vendorRegister , vendorLogin , getAllvendors , getVendorById} 

