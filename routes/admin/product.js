
const express = require('express');
const router = express.Router();
const { upload, productRouter } = require('../../app/controllers/productController');

// Middleware kiểm tra trạng thái đăng nhập
// function check(req, res, next) {
//    // console.log("Session status:", req.session);
//     if (req.session.user) {
//         next();
//     } else {
//         res.status(401).json({ message: 'Unauthorized: Please log in to continue.' });
//     }
// }

// Endpoint kiểm tra xác thực




router.post('/', upload.single('img'), productRouter.add);

router.put('/:id', upload.single('img'), productRouter.update);

router.delete('/:id', productRouter.delete);

router.get('/', productRouter.display);

module.exports = router;
