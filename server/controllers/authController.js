const bcrypt = require('bcrypt');
const generateTokens = require('../utils/authUtils');
const jwtConfig = require('../config/jwtConfig');
const UserServices = require('../services/User.services');

exports.registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // проверка на пустые поля
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      res.status(400).json({ message: 'Заполните все поля' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserServices.createUser({
      name,
      email,
      password: hashPassword,
    });
    // console.log(user);

    if (user) {
      delete user.dataValues.password;

      // обязательно в объект
      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .status(201)
        .cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        })
        .json({ message: 'success', user, accessToken });
      return;
    }
    res.status(400).json({ message: 'Произошла ошибка' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.authorization = async (req, res) => {
  try {
    const { email, password } = req.body;
    // проверка на пустые поля
    if (email.trim() === '' || password.trim === '') {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }

    const user = await UserServices.getUser(email);
    console.log(user);

    if (user) {
      // пароль и хэш пароль из бд
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        delete user.password;
        // обязательно в объект
        const { accessToken, refreshToken } = generateTokens({ user });
        res
          .status(201)
          .cookie(jwtConfig.refresh.type, refreshToken, {
            httpOnly: true,
            maxAge: jwtConfig.refresh.expiresIn,
          })
          .json({ message: 'success', user, accessToken });
        return;
      }
    }
    res.status(400).json({ message: 'Email или password неверные' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};