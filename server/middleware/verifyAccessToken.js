require('dotenv').config();
const jwt = require('jsonwebtoken');

// контролер
function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // положили токен в заголовок
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); // достаем из токена пользователя
    if (!accessToken)
      return res.status(401).json({ message: 'Токен не предоставлен' });
    // хранилище пользователя (res.locals)

    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid access token');
    res.status(403).send('Invalid access token');
  }
}

module.exports = verifyAccessToken;
