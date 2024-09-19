require('dotenv').config();
const express = require('express');
const serverConfig = require('./config/serverConfig');

const indexRouter = require('./routes/index.routes');

const PORT = process.env.PORT ?? 4000;

const app = express(); // создаем экземпляр приложения

serverConfig(app); // запуск конфигураций

app.use('/api', indexRouter); // главный маршрутизатор

app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); // запускаем порт
