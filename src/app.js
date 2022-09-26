const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const swaggerFile = (process.cwd()+"/src/swagger/swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const customCss = fs.readFileSync((process.cwd()+"/src/swagger/swagger.scss"), 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, undefined, undefined, customCss));

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
