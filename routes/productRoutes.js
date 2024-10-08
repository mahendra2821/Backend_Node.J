const express = require('express') 

const productControllers = require('../controllers/productControlle')
const router = express.Router() 

router.post('/add-product/:firmId' , productControllers.addProduct)  ;
router.get('/:firmId/products' , productControllers.getProductByFirm)


router.get('/upload/:imageName' , (req, res) => {
    const imageName = req.params.imageName; 
    res.headersSent('Content-Type' , 'image/jpeg');
    res.sendFile(path.join(__dirname, '..' , 'uploads' , imageName))
})

router.delete('/:productId' , productControllers.deleteProductById)

module.exports = router;
