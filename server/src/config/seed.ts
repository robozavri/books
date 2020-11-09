import logger from '../helpers/logger';
import config from '../config/environment';
import { roles } from '../constants/user';
import * as _ from 'lodash';

import * as UserDao from '../api/users/user.dao';
import * as MetaDao from '../api/metas/meta.dao';
import * as EventDao from '../api/events/event.dao';
import * as CategoriesDao from '../api/categories/categories.dao';

import * as UserStub from '../stubs/user.stub';
import * as MetaStub from '../stubs/meta.stub';
import * as EventStub from '../stubs/event.stub';
import * as CategoriesStub from '../stubs/categories.stub';


export async function seedDB() {
  const { seedDB, env } = config;
  if (!seedDB) return;
  if (env === 'development') {
    await clearDBDevelopment();
    await seedDBDevelopment();
  }
  if (env === 'production') {
    await clearDBProduction();
    await seedDBProduction();
  }
}

export async function seedDBDevelopment() {
  await UserDao.insertMany(getAdmin());
  await MetaDao.create(MetaStub.getSingle());
  await EventDao.insertMany(EventStub.getMany(11));
  await CategoriesDao.insertMany(CategoriesStub.getMany(11));


  logger.info('Seed DB development completed');
}

export async function seedDBProduction() {
  await UserDao.insertMany(getAdmin());
  await MetaDao.create(MetaStub.getSingle());
  await EventDao.insertMany(EventStub.getMany(11));
  await CategoriesDao.insertMany(CategoriesStub.getMany(11));

  logger.info('Seed DB production completed');
}

export async function clearDBDevelopment() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await EventDao.destroyAll();
  await CategoriesDao.destroyAll();
}

export async function clearDBProduction() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await EventDao.destroyAll();
  await CategoriesDao.destroyAll();
}

function getAdmin() {
  return [
    UserStub.getSingle({
      email: 'admin@project.com',
      name: 'Admin',
      role: roles.ADMIN,
      isActivated: true,
    })
  ];
}