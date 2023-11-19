import { Options } from '@mikro-orm/core';


import { PrivateData } from "../entities/UserEntity";
import { ProfileData } from "../entities/ProfileEntity";

/** 
 * Mikro ORM Connection options object
 * If using a different database other than Mongo DB change 
 * the "type" as necessary following the guidelines here: https://mikro-orm.io/docs/usage-with-sql
 *  */
export const options: Options = {
  type: 'mongo',
  entities: [PrivateData,ProfileData],
  // dbName: 'TechDem
  dbName: 'ic-wallet',
  debug: true
};


// export const yumi_nft_options: Options = {
//   type: 'mongo',
//   entities: [YumiNft],
//   // dbName: 'TechDem
//   dbName: 'yumi-nft-database',
//   debug: true
// };

// export default {options, yumi_nft_options};