const loginRouter = require('./login');
const registerRouter = require('./register');
const productRouter = require('./admin/product');
const categoryRouter = require('./admin/category');
const cart = require('./cart');
const homeRouter = require('./home');
function route(app) {
    app.use('/', loginRouter);
    app.use('/register',registerRouter);
    app.use('/product',productRouter);
    app.use('/category',categoryRouter);
    //home
    app.use('/home',homeRouter);
    app.use('/cart',homeRouter);
}

module.exports = route;
