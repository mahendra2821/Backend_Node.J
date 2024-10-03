
// ............IMPORTING THE MONGOSE ................................

const mongoose = require('mongoose') //ODM -> OBJECT DATA MODULING  LIBRARY FOR MONGOdb

// ...............END...............................................


//..........................DEFINE THE VENDOR SCHEMA ..........................


const vendorSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    firm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
})

//......................END......................................

//...............CREATING A VENDOR MODEL.................................

const Vendor = mongoose.model('Vendor' , vendorSchema) 


// ...........................................END........................................

//.............EXPORTING THE VENDOR MODULE......................................

module.exports = Vendor 

//.......................END.........................................



