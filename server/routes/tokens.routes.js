const router = require('express').Router();
const { refreshToken, logOut } = require('../controllers/tokenController');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');


router.get('/refresh', verifyRefreshToken, refreshToken);
router.delete('/logout', logOut)

module.exports = router;
