const router = require('express').Router();
const cartController = require('../app/controllers/cartController');
const authenticateToken = require('../middlerware/authToken');


router.delete('/:id',authenticateToken,cartController.removeCart);
router.post('/add',authenticateToken,cartController.addCart);
router.get('/',authenticateToken,cartController.getCart);