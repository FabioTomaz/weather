import { Router } from 'express';
import express from 'express';
import path from 'path';

const webDir = path.join(path.dirname(require.main.filename), '..', '..', 'web/dist/web/');

export default (app: Router) => {
  app.use(express.static(webDir));
  app.get('/', (req, res) => {
    res.sendFile(path.join(webDir, 'index.html'));
  });
};
