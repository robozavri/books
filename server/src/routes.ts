import express from 'express';
import { Express, Response, Request, NextFunction } from 'express';
import path from 'path';
import config from './config/environment';
import logger from './helpers/logger';
import * as auth from './auth';
import * as locator from './helpers/locator';
import { AppError } from './errors';

import fileRouter from './api/files';
import userRouter from './api/users';
import metaRouter from './api/metas';
import eventRouter from './api/events';
import appLogsRouter from './api/appLogs';
import categoriesRouter from './api/categories';
import booksRouter from './api/books';

import { getMetaTags } from './helpers/metaTagsHelper';

export function initRoutes(app: Express) {
  app.use(express.static(path.join(config.paths.uploads)));

  app.get('/admin', renderAdminHtml);
  app.get('/', renderClientHtml);
  app.use(express.static(path.join(config.root, '../client/dist')));
  app.use(express.static(path.join(config.root, '../admin/dist')));
  app.set('views', path.join(config.root, '../client/dist'));
  app.set('views', path.join(config.root, '../admin/dist'));

  app.use(auth.setUser);
  app.use(locator.setLocation);

  app.use('/api/users', userRouter);
  app.use('/api/files', fileRouter);
  app.use('/api/metas', metaRouter);
  app.use('/api/events', eventRouter);
  app.use('/api/appLogs', appLogsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/books', booksRouter);

  app.get('/admin/*', renderAdminHtml);
  app.get('/*', renderClientHtml);

  app.use(handleError);
}

function renderClientHtml(req: Request, res: Response) {
  res.render(path.join(config.root, '../client/dist/index.html'));
}

function renderAdminHtml(req: Request, res: Response) {
  res.render(path.join(config.root, '../admin/dist/index.html'));
}

async function setMetaTags(req: any, res: Response, next: NextFunction) {
  try {
    const { originalUrl: url } = req;
    req.metaTags = await getMetaTags(url);
    next();
  } catch (e) {
    next(e);
  }
}

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  try {
    const status = Object(err).httpStatusCode || 500;
    const data = Object(err).data;
    if (data) {
      res.json(data);
    } else {
      res.sendStatus(status);
    }
    if (err instanceof AppError) {
      logger.error(err.message);
    } else {
      logger.error(err);
    }
  } catch (error) {
    logger.error(error);
  }
}
