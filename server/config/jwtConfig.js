const jwt = require('jsonwebtoken');

const jwtConfig = {
  access: {
    secret: process.env.JWT_SECRET || 'result', // задаю секретный ключ
    type: 'accessToken',
    expiresIn: `${1000 * 60 * 5}`,
  },
  refresh: {
    type: 'refreshToken',
    expiresIn: `${1000 * 60 * 60 * 12}`,
  },
};

module.exports = jwtConfig;
