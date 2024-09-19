const express = require('express');
const cookieParser = require('cookie-parser');

// чтобы сервер смог обработать запрос от клиента
const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
};

module.exports = serverConfig;
