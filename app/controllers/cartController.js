
const Cart = require('../models/carts');
const Product = require('../models/Product');
class cartController{
    async getCart(req,res) {
        try {
            const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
            if (!cart) {
                return res.status(200).json({
                    message: 'Cart is empty',
                    cart: { user: req.user._id, products: [] } // Trả về định dạng nhất quán
                });
            }
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching cart', error: err.message });
        }
    }
    async addCart(req,res){
        const {productId,quantity} = req.body;
        try{
            const product = await Product.findById(productId);
            if(!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }
            // check gio hang user
            let cart = await Cart.findOne({ user: req.user._id })
            if (!cart) {
                cart = new Cart({ user: req.user._id, products: [] });
            }//add string
            const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if(existingProductIndex>=0){
                cart.products[existingProductIndex].quantity +=  product.quantity;
                cart.products[existingProductIndex].price += product.price;
            }
            else {
                cart.products.push({
                    product: productId,
                    quantity: quantity,
                    price: product.price
                });
            }
            await cart.save();
            product.stock -= quantity;
            await product.save(); 

            res.status(200).json({ message: 'Product added to cart', cart });
        }catch(error){
            res.status(500).json({ message: 'Error adding to cart', error: err.message });
        }
    }
    async removeCart(req,res){
        const productId = req.params.id;
        try {
            // join từ products của cart đến product(là khóa phụ trong của Cart) của Product
            const cart = await Cart.findOne({ user: req.user._id}).populate('products.product');
            if(!cart){
                return res.status(404).json({ message: 'Cart not found' });
            }
            cart.products = cart.products.filter(item => item.product.toString() !== productId);
            await cart.save();
            res.status(200).json({ message: 'Product removed from cart', cart });
        }catch(err){
            return res.status(404).json({ message: 'Cart not found' });
        }
    }
}
module.exports = new cartController();