import { Router, Request, Response, NextFunction } from 'express';
import * as categoriesDao from './categories.dao';
import * as categoriesParser  from './categories.parser';
import * as auth from '../../auth';


const categoriesRouter = Router();

categoriesRouter.get('/', categoriesParser.parseGetByQuery, getByQuery);
categoriesRouter.post('/', auth.isAdmin, categoriesParser.parseCreate, create);
categoriesRouter.put('/:id', auth.isAdmin, categoriesParser.parseUpdate, update);
categoriesRouter.delete('/:id', auth.isAdmin, destroy);
categoriesRouter.patch('/positions', categoriesParser.parseUpdatePositions, updatePositions);

export default categoriesRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const categoriesData = await categoriesDao.getByQuery(query);
    res.json(categoriesData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await categoriesDao.create({ ...payload, position: 0 });
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await categoriesDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      categoriesDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await categoriesDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}