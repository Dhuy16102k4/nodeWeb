const router = require('express').Router();
const homeController = require('../app/controllers/homeController');

router.get('/',homeController.display);

module.exports = router;