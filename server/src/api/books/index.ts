import { Router, Request, Response, NextFunction } from 'express';
import * as booksDao from './books.dao';
import * as booksParser  from './books.parser';
import * as auth from '../../auth';


const booksRouter = Router();

booksRouter.get('/', booksParser.parseGetByQuery, getByQuery);
booksRouter.post('/', auth.isAdmin, booksParser.parseCreate, create);
booksRouter.put('/:id', auth.isAdmin, booksParser.parseUpdate, update);
booksRouter.delete('/:id', auth.isAdmin, destroy);
booksRouter.patch('/positions', booksParser.parseUpdatePositions, updatePositions);

export default booksRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const booksData = await booksDao.getByQuery(query);
    res.json(booksData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await booksDao.create({ ...payload, position: 0 });
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await booksDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      booksDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await booksDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}