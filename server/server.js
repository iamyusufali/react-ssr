import express, { Router } from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = 8000;
const app = express();

const router = express.Router();

const serverRender = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An error occured');
    }
    return res.send(
      data.replace(
        `<div id="root></div>`,
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
};

router.use('^/$', serverRender);

router.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(router);

app.listen(PORT, () => {
  console.log(`React SSR App running on port ${PORT}`);
});
