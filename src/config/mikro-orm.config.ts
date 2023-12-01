import { Options } from '@mikro-orm/core';


import { PrivateData } from "../entities/UserEntity";
import { ProfileData } from "../entities/ProfileEntity";
import { Question } from '../entities/QuestionEntity';
import { Answer } from '../entities/AnswerEntity';
import  { Comment} from '../entities/CommentsEntity'
import  { HotEntity} from '../entities/HotEntity'


/** 
 * Mikro ORM Connection options object
 * If using a different database other than Mongo DB change 
 * the "type" as necessary following the guidelines here: https://mikro-orm.io/docs/usage-with-sql
 *  */
export const options: Options = {
  type: 'mongo',
  entities: [PrivateData,ProfileData, Question, Answer, Comment, HotEntity],
  // dbName: 'TechDem
  dbName: 'bitask',
  debug: true
};


