const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const CartController = require('../controllers/CartController');

router.use(authentication);
router.get('/', CartController.getAll);
router.post('/', CartController.addCart);
router.delete('/:id', CartController.deleteCart);
router.put('/:id', CartController.updateCart);
router.get('/checkout', CartController.checkOut);


module.exports = router;