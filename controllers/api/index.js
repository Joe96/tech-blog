const router = require('express').Router();
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
