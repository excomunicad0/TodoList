require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies; // из куки достаем токен
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // достаем из токена пользователя

    // хранилище пользователя (res.locals)
    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid refresh token');
    res.clearCookie('refreshToken').sendStatus(401);
  }
}
module.exports = verifyRefreshToken;
