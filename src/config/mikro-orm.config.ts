import { Options } from '@mikro-orm/core';

import { FileUpload } from '../entities/FileUploadEntity';
import { YumiNft } from '../entities/NftEntity';
import { YumiNftTest } from '../entities/NftEntityTest';
import { ShikuNftOwner } from '../entities/NftOwnerEntity';
import { icWalletUser } from "../entities/UserEntity";
/** 
 * Mikro ORM Connection options object
 * If using a different database other than Mongo DB change 
 * the "type" as necessary following the guidelines here: https://mikro-orm.io/docs/usage-with-sql
 *  */
export const options: Options = {
  type: 'mongo',
  entities: [icWalletUser, YumiNft,YumiNftTest , ShikuNftOwner, FileUpload],
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