const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const profileRoutes = require('./profileRoutes.js');


router.use('/', homeRoutes);
//router.use('/profileRoutes', profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;