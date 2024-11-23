
const mongoose = require('mongoose');
const Product = require('../models/products');
const Category = require('../models/categories');
const { console } = require('inspector');


class homeController {
    async display(req, res, next) {
        try {
            const categoryId = req.query.category;
            const page = parseInt(req.query.page) || 1;
            const productPerPage = parseInt(req.query.limit) || 3;
            let filter = {};

            if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
                filter.category = new mongoose.Types.ObjectId(categoryId);
            } else if (categoryId) {
                return res.status(400).json({ message: 'Invalid category ID format.' });
            }

            const [products, totalProducts, categories] = await Promise.all([
                Product.find(filter)
                    .populate('category', 'name')
                    .skip((page - 1) * productPerPage)
                    .limit(productPerPage)
                    .lean(),
                Product.countDocuments(filter),
                Category.find().lean()
            ]);

            const totalPages = Math.ceil(totalProducts / productPerPage);
         
            res.json({ products, categories, currentPage: page, totalPages, limit: productPerPage });
        } catch (error) {
            console.error('Error in display function:', error);
            res.status(500).json({ message: 'Failed to fetch products.', error: error.message });
        }
    }
}
module.exports = new homeController();