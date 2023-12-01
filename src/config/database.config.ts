import { EntityManager, EntityRepository, MikroORM, Collection } from '@mikro-orm/core';
import {options} from './mikro-orm.config';
// const { MongoClient } = require("mongodb");


/**
 * This demo makes use of Mikro ORM to manage the database connection and CRUD operations of our User entity (https://mikro-orm.io/)
 */

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
};


/**
 * Initiate connection to the database
 */
export async function connect() {
  options.clientUrl = process.env.DATABASE;
  // options.clientUrl = "mongodb://192.168.1.18:27017/?retryWrites=true&w=majority";
  // const client = new MongoClient(options);

  DI.orm = await MikroORM.init(options);
  DI.em = DI.orm.em;
}

// export async function yumi_nft_database_connect() {
//   yumi_nft_options.clientUrl = process.env.SHIKU_DATABASE;
//   // console.log(options.clientUrl)
//   // options.clientUrl = "mongodb://192.168.1.18:27017/?retryWrites=true&w=majority";

//   DI.orm = await MikroORM.init(yumi_nft_options);
//   DI.em = DI.orm.em;
// }