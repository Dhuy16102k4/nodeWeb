const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết với người dùng
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Sản phẩm trong giỏ
            quantity: { type: Number, required: true, min: 1 }, // Số lượng sản phẩm
            price: { type: Number, required: true, default: 0 } 
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
